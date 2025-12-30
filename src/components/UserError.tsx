import { ErrorComponent, ErrorComponentProps } from '@tanstack/react-router'

export const UserErrorComponent = ({ error }: ErrorComponentProps) => {
  return <ErrorComponent error={error} />
}
