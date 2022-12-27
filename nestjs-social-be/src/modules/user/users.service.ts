import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/entities/user.entity';
import { UserRepository } from 'src/models/repositories/user.repository';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UserRole, UserStatus } from 'src/shares/enums/user.enum';
import { httpErrors } from 'src/shares/exceptions';
import { checkRecoverSameAddress } from 'src/shares/helpers/utils';
import { hash_password } from 'src/shares/utils/hash-password.util';
import { Repository, Transaction, TransactionRepository } from 'typeorm';

@Injectable()
export class UserService {
  private web3;

  constructor(
    @InjectRepository(UserRepository, 'master') private usersRepositoryMaster: UserRepository,
    @InjectRepository(UserRepository, 'report') private usersRepositoryReport: UserRepository,
  ) {}

  async checkUserIdExisted(id: number): Promise<boolean> {
    const user = await this.usersRepositoryReport.findOne({
      id: id,
    });
    if (user) return true;
    else return false;
  }

  async checkUserAddressExisted(address: string): Promise<boolean> {
    const user = await this.usersRepositoryReport.findOne({
      where: {
        address: address,
      },
      select: ['id'],
    });
    return !!user;
  }

  async findUserById(id: number): Promise<UserEntity> {
    const user = await this.usersRepositoryReport.findOne({
      where: {
        id: id,
      },
    });
    if (!user) {
      throw new HttpException(httpErrors.ACCOUNT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async checkEmailExisted(email: string): Promise<boolean> {
    const user = await this.usersRepositoryReport.findOne({
      where: { email },
    });
    return !!user;
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    const user = await this.usersRepositoryReport.findOne({
      where: { email },
    });
    if (!user) {
      throw new HttpException(httpErrors.ACCOUNT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  async findUserByAddress(address: string): Promise<UserEntity> {
    const user = await this.usersRepositoryReport.findOne({
      where: {
        address: address,
      },
    });
    if (!user) {
      throw new HttpException(httpErrors.ACCOUNT_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }
    return user;
  }

  // @Transaction({ connectionName: 'master' })
  // async createUser(
  //   createUserDto: CreateUserDto,
  //   @TransactionRepository(UserEntity) transactionRepositoryUser?: Repository<UserEntity>,
  // ): Promise<UserEntity> {
  //   const { message, address, signature } = createUserDto;

  //   const sameAddress = await checkRecoverSameAddress({ address, signature, message });
  //   if (!sameAddress) {
  //     throw new HttpException(httpErrors.ACCOUNT_HASH_NOT_MATCH, HttpStatus.BAD_REQUEST);
  //   }

  //   const newUser = await transactionRepositoryUser.save({
  //     role: UserRole.USER,
  //     status: UserStatus.ACTIVE,
  //     address: createUserDto.address,
  //   });

  //   return newUser;
  // }
  @Transaction({ connectionName: 'master' })
  async createUser(
    createUserDto: CreateUserDto,
    @TransactionRepository(UserEntity) transactionRepositoryUser?: Repository<UserEntity>,
  ): Promise<UserEntity> {
    const { email, password } = createUserDto;
    const hashPassword = await hash_password(password);
    const newUser = await transactionRepositoryUser.save({
      email: email,
      password: hashPassword,
    });

    return newUser;
  }
}
