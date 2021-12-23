
import { styled } from '@material-ui/core/styles';

const Content = styled('div')(({ theme }) => ({
  zIndex: 1,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '12px 10px',
  backgroundColor: '#fff',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderLeft: 0,
  },
}));

export default Content;

/*
import styled from 'styled-components';

const Logo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-bottom: 48px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  h1 {
    margin-bottom: 0;
  }
`;

export default Logo;
*/