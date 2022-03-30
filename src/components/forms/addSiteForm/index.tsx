import React from 'react';
import { Col, Form, Input, Radio, Row } from 'antd';
import { FormInstance, Rule } from 'antd/es/form';
import { BOOL_RADIO_OPTS, AddSiteRequest } from '../ducks/types';
import { Flex, SubmitButton } from '../../themedComponents';
import TitleStack from '../../titleStack';
import { SiteEntryFields } from '../../../containers/treePage/ducks/types';
import { stringNumberRules } from '../../../utils/formRules';
import { getSEFieldDisplayName } from '../../../containers/treePage/ducks/selectors';

interface BoolRadioProps {
  readonly name: string;
}

interface StringInputProps extends BoolRadioProps {
  readonly placeholder: string;
  readonly rules?: Rule[];
}

interface AddSiteFormProps {
  readonly formInstance: FormInstance;
  readonly onFinish: (request: AddSiteRequest) => void;
}

const AddSiteForm: React.FC = (): JSX.Element => {
  const BoolRadioCol: React.FC<BoolRadioProps> = ({ name }) => {
    return (
      <Col span={6}>
        <Form.Item name={name}>
          <Radio.Group options={BOOL_RADIO_OPTS} />
        </Form.Item>
      </Col>
    );
  };

  const StringInput: React.FC<StringInputProps> = ({
    name,
    placeholder,
    rules,
  }) => {
    return (
      <Form.Item name={name} rules={rules}>
        <Input placeholder={placeholder} />
      </Form.Item>
    );
  };

  return (
    <Form>
      <Flex>
        <TitleStack
          title={getSEFieldDisplayName(SiteEntryFields.TREE_PRESENT)}
          minWidth={'150px'}
        >
          <BoolRadioCol name={SiteEntryFields.TREE_PRESENT} />
        </TitleStack>
      </Flex>
    </Form>
  );
};

export default AddSiteForm;
