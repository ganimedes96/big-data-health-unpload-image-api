import { Entity } from "../../../core/entities/entity"
import { UniqueEntityID } from "../../../core/entities/unique-entity-id"
import { Optional } from "../../../core/types/optional"


export interface IAccountProps {
  name: string
  email: string
  password: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Account extends Entity<IAccountProps> {

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  set password(password: string) {
    this.props.password = password
    this.touch()
  }

 

  static create(props: Optional<IAccountProps, 'createdAt'>, id?: UniqueEntityID) {
    const account = new Account(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return account
  }
}