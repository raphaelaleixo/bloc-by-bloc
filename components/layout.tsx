import Head from 'next/head';
import { Saira, Saira_Stencil_One } from 'next/font/google';

const saira = Saira({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-saira',
});

const sairaStencil = Saira_Stencil_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-saira-stencil',
});

const Layout: React.FC<{ children: JSX.Element }> = ({ children }) => (
        <>
            <Head>
                <title>Bloc by Bloc</title>
            </Head>
            <main className={`w-full h-full flex align-top justify-center items-start gap-6 ${saira.variable} ${sairaStencil.variable} font-saira`}>
                {children}
            </main>
        </>
);

export default Layout;
