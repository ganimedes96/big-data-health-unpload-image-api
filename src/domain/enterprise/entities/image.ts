import { Entity } from "../../../core/entities/entity"
import { UniqueEntityID } from "../../../core/entities/unique-entity-id"
import { Optional } from "../../../core/types/optional"


export interface IImageProps {
  publicId: string
  url: string,
  assetId: string
  displayName: string
  userId: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Image extends Entity<IImageProps> {

  get publicId() {
    return this.props.publicId
  }

  get url() {
    return this.props.url
  }

  get userId() {
    return this.props.userId
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  get assetId() {
    return this.props.assetId
  }

  get displayName() {
    return this.props.displayName
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  set publicId(publicId: string) {
    this.props.publicId = publicId
    this.touch()
  }

  set url(url: string) {
    this.props.url = url
    this.touch()
  }

  

  static create(props: Optional<IImageProps, 'createdAt'>, id?: UniqueEntityID) {
    const image = new Image(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return image
  }
}