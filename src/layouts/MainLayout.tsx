interface MainLayoutProps {
    children: React.ReactNode | React.ReactNode[];
}

export const MainLayout = ({ children }: MainLayoutProps) => {
    return <main className="main-layout">{children}</main>;
};
