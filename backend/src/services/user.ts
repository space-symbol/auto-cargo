import { PrismaClient, UserRole, Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { generateToken } from '../utils/auth';

export class UserService {
  constructor(private prisma: PrismaClient) {}

  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
    company?: string;
    role?: UserRole;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User already exists');
    }
  
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = await this.prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        company: data.company,
        role: data.role || UserRole.CLIENT
      }
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        company: user.company,
        role: user.role
      },
      token
    };
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new Error('Пользователь не найден');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Неверный пароль');
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      role: user.role
    });

    return {
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        role: user.role
      },
      token
    };
  }

  async createAdmin(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone: string;
  }) {
    return this.register({
      ...data,
      role: UserRole.ADMIN
    });
  }

  async getUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role
    };
  }

  async updateProfile(userId: string, data: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    company?: string;
  }) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        company: data.company
      }
    });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role
    };
  }

  async getUsers(params: {
    page: number;
    limit: number;
    search?: string;
    role?: UserRole;
  }) {
    const { page, limit, search, role } = params;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = {
      ...(search && {
        OR: [
          { firstName: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { lastName: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { email: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { phone: { contains: search, mode: Prisma.QueryMode.insensitive } },
          { company: { contains: search, mode: Prisma.QueryMode.insensitive } }
        ]
      }),
      ...(role && { role })
    };

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          phone: true,
          company: true,
          role: true,
          createdAt: true
        }
      }),
      this.prisma.user.count({ where })
    ]);

    return {
      users,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async updateUser(userId: string, data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    company?: string;
    role?: UserRole;
  }) {
    const user = await this.prisma.user.update({
      where: { id: userId },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
        role: data.role
      }
    });

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      company: user.company,
      role: user.role
    };
  }

  async deleteUser(userId: string) {
    await this.prisma.user.delete({
      where: { id: userId }
    });
  }
} 