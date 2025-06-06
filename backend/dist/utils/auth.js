"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authenticate = exports.verifyToken = void 0;
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
function generateToken(payload) {
    return jsonwebtoken_1.default.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
const verifyToken = async (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch {
        throw new Error('Invalid token');
    }
};
exports.verifyToken = verifyToken;
const authenticate = async (request, reply) => {
    try {
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new Error('No token provided');
        }
        const decoded = await (0, exports.verifyToken)(token);
        request.user = decoded;
    }
    catch (_error) {
        reply.code(401).send({ error: 'Unauthorized' });
    }
};
exports.authenticate = authenticate;
const requireRole = (allowedRoles) => {
    return async (request, reply) => {
        try {
            const user = request.user;
            if (!user || !allowedRoles.includes(user.role)) {
                throw new Error('Access denied');
            }
        }
        catch (_error) {
            reply.code(403).send({ error: 'Forbidden' });
        }
    };
};
exports.requireRole = requireRole;
