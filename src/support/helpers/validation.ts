import { ClassConstructor, plainToClass } from "class-transformer";
import { Validator } from "validator.ts/Validator";
import { ValidationError } from "validator.ts/ValidationError";

interface ValidationInterface<ParamType> {
  is_valid: boolean;
  errors: any[];
  check(param: any): boolean;
  data(): ParamType
}

export class Validation<ParamType> extends Boolean implements Boolean, ValidationInterface<ParamType> {
  private type: ClassConstructor<ParamType>;
  private object?: ParamType;
  public is_valid: boolean = false;
  public errors: any[] = [];

  constructor(type: ClassConstructor<ParamType>) {
    super(false);
    this.type = type;
  }
  
  public check(param: any): boolean {
    try {
      let object = plainToClass(this.type, param);
      let validator = new Validator();
      validator.validateOrThrow(object);
      this.object = object;
      this.is_valid = true;
      return true;
    } catch (error) {
      this.errors = (error as ValidationError).errors ?? error;
    }
    return false;
  }

  public data(): ParamType {
    return this.object ?? new this.type();
  }

  public toString() {
    return this.is_valid ? 'true' : 'false';
  }

  public valueOf() {
    return this.is_valid;
  }

  public static validate<Type>(paramType: ClassConstructor<Type>, data: any): Validation<Type>
  {
    let self = new Validation(paramType);
    self.check(data);
    return self;
  }
}

export function validate<Type>(paramType: ClassConstructor<Type>, data: any) {
  return Validation.validate(paramType, data);
}