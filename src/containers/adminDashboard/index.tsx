import React, { PropsWithChildren, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Form, message, Typography, Divider, Modal, Button } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { C4CState } from '../../store';
import {
  getPrivilegeLevel,
  getUserFirstName,
} from '../../auth/ducks/selectors';
import { LIGHT_GREEN, MID_GREEN } from '../../utils/colors';
import { PrivilegeLevel } from '../../auth/ducks/types';
import ChangePrivilegeForm from '../../components/forms/changePrivilegeForm';
import { Flex } from '../../components/themedComponents';
import SignupForm from '../../components/forms/signupForm';
import { SignupFormValues } from '../../components/forms/ducks/types';
import ProtectedApiClient from '../../api/protectedApiClient';
import { AppError } from '../../auth/axios';
import { getErrorMessage, n } from '../../utils/stringFormat';
import { SubmitButton } from '../../components/themedComponents';
import {
  BarChartOutlined,
  FileAddOutlined,
  MailOutlined,
  PlusOutlined,
  RocketFilled,
  SettingFilled,
  PictureOutlined,
} from '@ant-design/icons';
import Image1 from '../../assets/images/bkg1.png';
import Image2 from '../../assets/images/bkg2.png';
import Image4 from '../../assets/images/bkg4.png';
import ReviewImage from '../../assets/images/reviewImages.png';
import { Routes } from '../../App';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';

const AdminContentContainer = styled.div`
  width: 80vw;
  margin: 8vh auto auto;
`;

const ImageCard = styled.div`
  background-color: rgba(0, 0, 0, 0.25);
  background-blend-mode: darken;
  border-radius: 10px;
  width: 230px;
  height: 230px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16pt;
  font-weight: bold;
  transition: background-color 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const AdminDivider = styled(Divider)`
  margin-top: 10px;
  margin-bottom: 20px;
`;

interface ImageLinkCardProps {
  href: string;
  image: string;
}

const ImageLinkCard: React.FC<PropsWithChildren<ImageLinkCardProps>> = ({
  href,
  image,
  children,
}) => (
  <a href={href}>
    <ImageCard style={{ backgroundImage: `url(${image})` }}>
      {children}
    </ImageCard>
  </a>
);

const ICON_SIZE = 40;

const AdminDashboard: React.FC = () => {
  const { t } = useTranslation(n(site, ['admin', 'forms', 'home']), {
    nsMode: 'fallback',
  });

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  const userFirstName: string = useSelector((state: C4CState) => {
    return getUserFirstName(state.authenticationState.userData);
  });

  const [createChildForm] = Form.useForm();

  const [showAddChildModal, setShowAddChildModal] = useState<boolean>(false);
  const [showPromoteUserModal, setShowPromoteUserModal] =
    useState<boolean>(false);

  const onCreateChild = (values: SignupFormValues) => {
    ProtectedApiClient.createChild({
      email: values.email,
      username: values.username,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
    })
      .then(() => {
        message.success(t('create_child.success', { email: values.email }));
        createChildForm.resetFields();
      })
      .catch((error: AppError) => message.error(getErrorMessage(error)));
  };

  return (
    <>
      <Helmet>
        <title>{t('admin_title')}</title>
        <meta
          name="description"
          content="The page for admin users to modify accounts and download team data."
        />
      </Helmet>
      <PageLayout>
        <AdminContentContainer>
          <PageHeader
            pageTitle={t('admin_title')}
            pageSubtitle={t('title', { name: userFirstName })}
            subtitlecolor={MID_GREEN}
          />
          <Typography.Title level={3}>
            {t('manage_accounts.header')}
          </Typography.Title>
          <Flex margin={'30px 0'} gap={'50px 20px'}>
            <Button type="primary" href="/settings">
              <SettingFilled />
              {t('manage_accounts.my_settings.button')}
            </Button>
            <Button
              onClick={() => setShowPromoteUserModal(true)}
              color={LIGHT_GREEN}
            >
              <RocketFilled />
              {t('manage_accounts.promote_user.button')}
            </Button>
            <Button onClick={() => setShowAddChildModal(true)}>
              <PlusOutlined />
              {t('manage_accounts.create_child.button')}
            </Button>
          </Flex>
          <AdminDivider />
          <Typography.Title level={3}>
            {t('admin_functions.header')}
          </Typography.Title>
          <Flex gap={'40px 40px'} margin={'30px 0'}>
            <ImageLinkCard href={Routes.ADD_SITES} image={Image1}>
              <FileAddOutlined style={{ fontSize: ICON_SIZE }} />
              {t('admin_functions.add_sites')}
            </ImageLinkCard>
            <ImageLinkCard href={Routes.REPORTS} image={Image2}>
              <BarChartOutlined style={{ fontSize: ICON_SIZE }} />
              {t('admin_functions.view_reports')}
            </ImageLinkCard>
            <ImageLinkCard href={Routes.EMAIL} image={Image4}>
              <MailOutlined style={{ fontSize: ICON_SIZE }} />
              {t('admin_functions.email_volunteers')}
            </ImageLinkCard>
            <ImageLinkCard href={Routes.REVIEW_IMAGE} image={ReviewImage}>
              <PictureOutlined style={{ fontSize: ICON_SIZE }} />
              {t('admin_functions.review_site_images')}
            </ImageLinkCard>
          </Flex>
        </AdminContentContainer>
        <Modal
          title={t('manage_accounts.promote_user.modal')}
          open={showPromoteUserModal}
          onCancel={() => setShowPromoteUserModal(false)}
          footer={null}
        >
          <ChangePrivilegeForm privilegeLevel={privilegeLevel} />
        </Modal>
        <Modal
          title={t('manage_accounts.create_child.modal')}
          open={showAddChildModal}
          onCancel={() => setShowAddChildModal(false)}
          footer={null}
        >
          <SignupForm formInstance={createChildForm} onFinish={onCreateChild}>
            <Form.Item>
              <SubmitButton htmlType="submit">
                {t('create_child.submit')}
              </SubmitButton>
            </Form.Item>
          </SignupForm>
        </Modal>
      </PageLayout>
    </>
  );
};

export default AdminDashboard;
