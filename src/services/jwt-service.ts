import {inject} from '@loopback/core';
import {HttpErrors} from '@loopback/rest';
import {securityId, UserProfile} from '@loopback/security';
import {promisify} from 'util';
import {TokenServiceBindings} from '../keys';
const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string,
  ) {}
  async generateToken(userProfile: UserProfile) {
    if (!userProfile) throw new HttpErrors.Unauthorized('Error: userProfile is null');
    try {
      const token = await signAsync(userProfile, this.jwtSecret, {
        expiresIn: this.jwtExpiresIn, // expires in 1 hours,
      });
      return token as string;
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token: ${error.message}`);
    }
  }

  async verifyToken(token: string): Promise<UserProfile> {
    if (!token) throw new HttpErrors.Unauthorized('Error: token is null');
    let userProfile: UserProfile;
    try {
      const decodedToken = await verifyAsync(token, this.jwtSecret);
      userProfile = Object.assign(
        {[securityId]: '', name: '', id: ''},
        {[securityId]: decodedToken.id, name: decodedToken.name, id: decodedToken.id},
      );
      return userProfile;
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error verifying token: ${error.message}`);
    }
  }
}
