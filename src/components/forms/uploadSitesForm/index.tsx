import React from 'react';
import { Upload, Form, Button } from 'antd';
import { uploadSiteRules } from '../../../utils/formRules';
import { SubmitButton } from '../../themedComponents';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload/interface';
import ProtectedClient from '../../../api/protectedApiClient';
import { AddSiteRequest } from '../ducks/types';

const UploadSitesForm: React.FC = () => {
  const [uploadSitesForm] = Form.useForm();

  const [fileList, setFileList] = React.useState<UploadProps>({});

  return (
    <Form
      name="uploadSites"
      form={uploadSitesForm}
      onFinish={(values) => {
        const file = values.uploadedSitesCsv.fileList[0];
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const allSites: AddSiteRequest[] = [];

          const sites: string[] = e.target.result.split('\n');
          // ignore header line
          sites.shift();
          sites.forEach((element) => {
            const site = element.split(',');
            // site = ['13 Street', '12222', 'Back Bay']
            console.log(site);
          });

          ProtectedClient.addSites({ sites: e.target.result });
        };
        reader.readAsText(file.originFileObj);
      }}
    >
      <Form.Item
        name="uploadedSitesCsv"
        rules={uploadSiteRules}
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
        Confirm
      </SubmitButton>
    </Form>
  );
};

export default UploadSitesForm;
