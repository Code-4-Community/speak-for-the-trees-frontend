import React from 'react';
import { message, Upload, Form, Button } from 'antd';
import { requiredRule } from '../../../utils/formRules';
import { SubmitButton } from '../../themedComponents';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload/interface';
import ProtectedClient from '../../../api/protectedApiClient';

interface UploadSitesFormRule {
  sitesCSV: UploadProps;
}

const UploadSitesForm: React.FC = () => {
  const [uploadSitesForm] = Form.useForm<UploadSitesFormRule>();

  const [fileList, setFileList] = React.useState<UploadProps>({});

  const handleUploadSites = (values: UploadSitesFormRule) => {
    const csvFile = values.sitesCSV.fileList?.[0];
    if (!csvFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (event: ProgressEvent) => {
      const csvText = (event.target as FileReader).result as string;
      ProtectedClient.addSites(csvText)
        .then(() => {
          message.success('Sites successfully added!');
        })
        .catch(() => {
          message.error('Sites could not be added');
        });
    };
    reader.readAsText(csvFile.originFileObj as Blob);
  };

  return (
    <Form
      name="uploadSites"
      form={uploadSitesForm}
      onFinish={handleUploadSites}
    >
      <Form.Item
        name="sitesCSV"
        rules={requiredRule('Please upload a .csv file')}
        valuePropName="file"
      >
        <Upload
          fileList={fileList.fileList}
          onChange={setFileList}
          maxCount={1}
          beforeUpload={() => false}
          accept=".csv"
        >
          <Button icon={<UploadOutlined />}>Upload .csv</Button>
        </Upload>
      </Form.Item>
      <SubmitButton type="primary" htmlType="submit">
        Upload
      </SubmitButton>
    </Form>
  );
};

export default UploadSitesForm;
