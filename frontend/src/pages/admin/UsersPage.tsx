import { useState, useEffect } from 'react';
import { usersApi } from '../../api/users';
import { User, UserRole } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from '@/lib/auth/AuthProvider';

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'ALL'>('ALL');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { user: currentUser } = useAuth();

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await usersApi.getUsers({
        page,
        limit: 10,
        search: search || undefined,
        role: roleFilter === 'ALL' ? undefined : roleFilter,
      });
      setUsers(response.users);
      setTotalPages(response.pagination.pages);
    } catch (error) {
      toast.error('Ошибка при загрузке пользователей');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [page, search, roleFilter]);

  const handleEditUser = async (userData: Partial<User>) => {
    if (!selectedUser) return;
    try {
      await usersApi.updateUser(selectedUser.id, userData);
      toast.success('Пользователь успешно обновлен');
      setIsEditDialogOpen(false);
      loadUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Ошибка при обновлении пользователя');
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return;
    try {
      await usersApi.deleteUser(userId);
      toast.success('Пользователь успешно удален');
      loadUsers();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Ошибка при удалении пользователя');
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Управление пользователями</h1>
        <div className="flex gap-4">
          <Input
            placeholder="Поиск..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64"
          />
          <Select value={roleFilter} onValueChange={(value) => setRoleFilter(value as UserRole | 'ALL')}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Роль" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Все роли</SelectItem>
              {Object.values(UserRole).map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Имя</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Телефон</TableHead>
              <TableHead>Компания</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Дата регистрации</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.company || '-'}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  {user.id !== currentUser?.id && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        Редактировать
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Удалить
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
        >
          Назад
        </Button>
        <span className="py-2">
          Страница {page} из {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
        >
          Вперед
        </Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать пользователя</DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                handleEditUser({
                  firstName: formData.get('firstName') as string,
                  lastName: formData.get('lastName') as string,
                  email: formData.get('email') as string,
                  phone: formData.get('phone') as string,
                  company: formData.get('company') as string,
                  role: formData.get('role') as UserRole,
                });
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Имя</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    defaultValue={selectedUser.firstName}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Фамилия</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    defaultValue={selectedUser.lastName}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={selectedUser.email}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={selectedUser.phone}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Компания</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={selectedUser.company}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Роль</Label>
                <Select name="role" defaultValue={selectedUser.role}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(UserRole).map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                >
                  Отмена
                </Button>
                <Button type="submit">Сохранить</Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 