import React from 'react';
import { Upload, Form, Button } from 'antd';
import { uploadSiteRules } from '../../../utils/formRules';
import { SubmitButton } from '../../themedComponents';
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd/lib/upload/interface';

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
        reader.onload = (e) => {
          // console.log(e.target.result);
        };
        reader.readAsText(values.target.file);
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
          beforeUpload={(_, fileList) => {
            setFileList(fileList);
          }}
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
