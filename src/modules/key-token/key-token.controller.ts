import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { KeyTokenService } from './key-token.service';
import { CreateKeyTokenDto } from './dto/create-key-token.dto';
import { UpdateKeyTokenDto } from './dto/update-key-token.dto';

@Controller('key-token')
export class KeyTokenController {
  constructor(private readonly keyTokenService: KeyTokenService) {}

  
}
