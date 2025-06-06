"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_1 = require("../utils/auth");
class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async register(data) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: data.email }
        });
        if (existingUser) {
            throw new Error('User already exists');
        }
        const hashedPassword = await bcrypt_1.default.hash(data.password, 10);
        const user = await this.prisma.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: hashedPassword,
                phone: data.phone,
                company: data.company,
                role: data.role || client_1.UserRole.CLIENT
            }
        });
        const token = (0, auth_1.generateToken)({
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
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!user) {
            throw new Error('Пользователь не найден');
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            throw new Error('Неверный пароль');
        }
        const token = (0, auth_1.generateToken)({
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
    async createAdmin(data) {
        return this.register({
            ...data,
            role: client_1.UserRole.ADMIN
        });
    }
    async getUserById(id) {
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
    async updateProfile(userId, data) {
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
    async getUsers(params) {
        const { page, limit, search, role } = params;
        const skip = (page - 1) * limit;
        const where = {
            ...(search && {
                OR: [
                    { firstName: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { lastName: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { email: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { phone: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } },
                    { company: { contains: search, mode: client_1.Prisma.QueryMode.insensitive } }
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
    async updateUser(userId, data) {
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
    async deleteUser(userId) {
        await this.prisma.user.delete({
            where: { id: userId }
        });
    }
}
exports.UserService = UserService;
