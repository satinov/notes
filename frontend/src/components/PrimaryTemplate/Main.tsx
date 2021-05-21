import { FC } from "react";

type ClassesKeys = "content" | "contentShift" | "drawerHeader";

interface Props {
  classes: Record<ClassesKeys, string>;
}

export const Main: FC<Props> = ({ classes, children }) => {
  return (
    <main id="main" className={classes.content}>
      {children}
    </main>
  );
};
