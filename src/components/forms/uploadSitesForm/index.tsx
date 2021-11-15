import React from 'react';
import { addSitesReadFile } from '../../../utils/csvParse';
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
      onFinish={(values) => addSitesReadFile(values.uploadedSitesCsv.fileList[0])}
    >

      <Form.Item 
        name="uploadedSitesCsv" 
        rules={uploadSiteRules}
        valuePropName="file"
      >
        <Upload fileList={fileList.fileList} onChange={setFileList} beforeUpload={() => false} accept=".csv">
          <Button icon={<UploadOutlined />}> Upload .csv </Button>
        </Upload>

      </Form.Item>

      <SubmitButton type="primary" htmlType="submit">
        Confirm
      </SubmitButton>

    </Form>
  )
}

export default UploadSitesForm;