import { FC } from "react";
import { AuthPage } from "../../features/auth/AuthPage";

type ClassesKeys = "content" | "contentShift" | "drawerHeader";

interface Props {
  classes: Record<ClassesKeys, string>;
  open: boolean;
}

export const Main: FC<Props> = ({ classes, open }) => {
  return (
    <main className={classes.content}>
      <AuthPage />
    </main>
  );
};
