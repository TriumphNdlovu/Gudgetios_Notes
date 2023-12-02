import { createGlobalStyle } from 'styled-components';
import type { AppProps } from 'next/app';

const GlobalStyle = createGlobalStyle
`
body {
  background-color: red; // This should turn the background color of the body to red
}

  @media (max-width: 768px) {
    * {
      transform: scale(0.4);
      font-size: 5000px;
    }
  }
`;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;