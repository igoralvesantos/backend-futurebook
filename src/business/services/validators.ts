import { ValidatorsGateway } from '../gateways/validatorsGateway';
import { BadRequestError } from '../errors/BadRequestError';
import { UnauthorizedError } from '../errors/UnauthorizedError';

export class Validators implements ValidatorsGateway {
	private isValid(input: string): boolean {
		return input !== undefined && input !== null && input !== '';
	}

	public validateGetFeedInput(input: any): void {
    if(!this.isValid(input.token)) {
      throw new UnauthorizedError("Unauthorized")
    }
    
    if (!this.isValid(input.page)) {
			throw new BadRequestError('Missing Input');
    }
	}

	public validateGetFeedByTypeInput(input: any): void {
    if(!this.isValid(input.token)) {
      throw new UnauthorizedError("Unauthorized")
    }
    
    if (!this.isValid(input.page) || !this.isValid(input.type)) {
			throw new BadRequestError('Missing Input');
    }
	}

	public validateCreatePostInput(input: any): void {
    if(!this.isValid(input.token)) {
      throw new UnauthorizedError("Unauthorized")
    }

    if (!this.isValid(input.picture) || !this.isValid(input.description) || !this.isValid(input.type)) {
			throw new BadRequestError('Missing Input');
    }
	}

	public validateDislikePostInput(input: any): void {
    if(!this.isValid(input.token)) {
      throw new UnauthorizedError("Unauthorized")
    }
		
    if (!this.isValid(input.postId)) {
			throw new BadRequestError('Missing Input');
    }
	}

	public validateLikePostInput(input: any): void {
    if(!this.isValid(input.token)) {
      throw new UnauthorizedError("Unauthorized")
    }

    if (!this.isValid(input.postId)) {
			throw new BadRequestError('Missing Input');
    }
	}

	public validateLoginInput(input: any): void {
    if (input.email.indexOf("@") === -1) {
      throw new BadRequestError("Invalid email request");
    }
    
    if (!this.isValid(input.password)) {
			throw new UnauthorizedError('Invalid password request');
		}
	}

	public validateMakeFriendshipInput(input: any): void {
    if(!this.isValid(input.token)) {
      throw new UnauthorizedError("Unauthorized")
    }

    if (!this.isValid(input.friendId)) {
			throw new BadRequestError('Missing Input');
    }
	}

	public validateSignupInput(input: any): void {  
    if (input.email.indexOf("@") === -1) {
      throw new BadRequestError("Invalid email request");
    }

    if (!this.isValid(input.name) || !this.isValid(input.password)) {
			throw new BadRequestError('Missing Input');
    }
	}

	public validateUndoFriendshipInput(input: any): void {   
    if(!this.isValid(input.token)) {
      throw new UnauthorizedError("Unauthorized")
    }

    if (!this.isValid(input.friendId)) {
			throw new BadRequestError('Missing Input');
    }
	}
}