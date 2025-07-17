import { User } from '@/types/user';

export function verifyToken(token: string): User | null {
  try {
    const decodedData = Buffer.from(token, 'base64').toString('utf-8');
    const user: User = JSON.parse(decodedData);
    // Basic validation to ensure the object has the expected shape
    if (user && user.id && user.name && user.email && user.role) {
      return user;
    }
    return null;
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
}
