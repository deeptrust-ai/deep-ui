/** Props for the {@link User} atom component. */
export interface IUserProps {
  /** User's full display name. */
  readonly name: string;
  /** User's job title or position. */
  readonly position: string;
  /** URL of the user's profile picture. */
  readonly pictureSrc: string;
}
