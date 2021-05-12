import React, { Children, cloneElement, ReactElement } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import { TabProps } from "@material-ui/core/Tab";

interface TabPanelProps {
  children: React.ReactNode;
  index?: any;
  value?: any;
}

export function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  console.log(props);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

interface AppTabsProps {
  children:
    | ReactElement<PartialBy<TabPanelProps, "index" | "value">>
    | ReactElement<PartialBy<TabPanelProps, "index" | "value">>[];
  tabs: ReactElement<{
    children: ReactElement<TabProps> | ReactElement<TabProps>[];
  }>;
}

export const AppTabs = ({ tabs, children }: AppTabsProps) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          {Children.map(tabs.props.children, (tab, idx) => {
            return cloneElement(tab, { ...a11yProps(idx) });
          })}
        </Tabs>
      </AppBar>

      {Children.map(children, (tabPanel, index) => {
        return cloneElement(tabPanel, { value, index });
      })}
    </div>
  );
};
