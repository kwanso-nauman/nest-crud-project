import { ForbiddenException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  /**
   * 
   * @param createUserInput 
   * @returns 
   */
  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      //duplicate email check
      const existingUser = await this.usersRepository.findOneOrFail({ where: { email: createUserInput.email.trim().toLowerCase() } });
      if (existingUser) {
        throw new ForbiddenException({
          status: HttpStatus.FORBIDDEN,
          error: 'User already exists with this email',
        });
      }
      //
      const newUser = this.usersRepository.create(createUserInput);
      return this.usersRepository.save(newUser);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * 
   * @returns 
   */
  async findAll(): Promise<User[]> {
    try {
      return this.usersRepository.find();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  /**
   * 
   * @param id 
   * @returns 
   */
  async findOne(id: string): Promise<User> {
    try {
      return this.usersRepository.findOneOrFail({ where: { id } });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // update(id: number, updateUserInput: UpdateUserInput) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

}
