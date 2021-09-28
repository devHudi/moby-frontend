import PropTypes from 'prop-types';
import styled from 'styled-components';

const DefaultWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0 15px;
  border: 1px solid #000000;
  border-radius: 50px;
  width: ${(props) => props.width || '100%'};
`;

const UnderlineWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 40px;
  padding: 0px 5px;
  border-bottom: 1px solid #000000;
  width: ${(props) => props.width || '100%'};
`;

const Input = styled.input`
  border: none;
  width: 100%;
  height: 100%;
  font-size: 11px;
`;

const Icon = styled.div`
  margin-right: 12px;
  flex-basis: 15px;
  width: 15px;
  height: 15px;
`;

const Wrapper = ({ underline, children, ...props }) => {
  if (underline)
    return <UnderlineWrapper {...props}>{children}</UnderlineWrapper>;

  return <DefaultWrapper {...props}>{children}</DefaultWrapper>;
};

Wrapper.propTypes = {
  underline: PropTypes.bool,
  children: PropTypes.node,
};

Wrapper.defaultProps = {
  underline: false,
  children: null,
};

const TextField = ({ width, underline, icon }) => (
  <Wrapper width={width} underline={underline}>
    {icon && <Icon>{icon}</Icon>}
    <Input />
  </Wrapper>
);

TextField.propTypes = {
  width: PropTypes.number,
  underline: PropTypes.bool,
  icon: PropTypes.node,
};

TextField.defaultProps = {
  width: null,
  underline: false,
  icon: null,
};

export default TextField;
