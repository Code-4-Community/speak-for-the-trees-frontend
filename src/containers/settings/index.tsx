import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Button, Typography, Modal } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { MID_GREEN } from '../../utils/colors';
import { C4CState } from '../../store';
import {
  getUserEmail,
  getUserFullName,
  getUsername,
} from '../../auth/ducks/selectors';
import ChangeUsernameForm from '../../components/forms/changeUsernameForm';
import DeleteAccountForm from '../../components/forms/deleteAccountForm';
import ChangeEmailForm from '../../components/forms/changeEmailForm';
import ChangePasswordForm from '../../components/forms/changePasswordForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';
import { site } from '../../constants';

const formLayout = {
  wrapperCol: { span: 17 },
};

const cSpan = 11;

const SettingsContainer = styled.div`
  width: 80vw;
  margin: 8vh auto auto;
`;

const MobileSettingsContainer = styled.div`
  padding: 30px;
`;

const SubmitButton = styled(Button)`
  min-width: 96px;
  height: 40px;
  font-size: 16px;
`;

const FormTitle = styled(Typography.Paragraph)`
  margin-top: 45px;
  font-size: 20px;
  font-weight: bold;
  color: ${MID_GREEN};
  line-height: 28px;
`;

const UserInformationText = styled(Typography.Paragraph)`
  font-size: 15px;
  line-height: 15px;
`;

const DeleteAccountContainer = styled.div`
  margin-bottom: 100px;
`;

const Settings: React.FC = () => {
  const { t } = useTranslation(n(site, ['settings', 'forms']), {
    nsMode: 'fallback',
  });

  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const { windowType } = useWindowDimensions();
  const userFullName = useSelector((state: C4CState) =>
    getUserFullName(state.authenticationState.userData),
  );
  const userEmail = useSelector((state: C4CState) =>
    getUserEmail(state.authenticationState.userData),
  );
  const userUsername = useSelector((state: C4CState) =>
    getUsername(state.authenticationState.userData),
  );

  return (
    <>
      <Helmet>
        <title>{t('settings')}</title>
        <meta
          name="description"
          content="Where the user can change their account settings, including their username, email, and password, and delete their account."
        />
      </Helmet>
      {(() => {
        switch (windowType) {
          case WindowTypes.Desktop:
          case WindowTypes.NarrowDesktop:
          case WindowTypes.Tablet:
            return (
              <PageLayout>
                <SettingsContainer>
                  <PageHeader pageTitle={t('title')} />

                  <Row>
                    <Col span={cSpan}>
                      <FormTitle>{t('header.profile')}</FormTitle>
                      <UserInformationText strong>
                        {t('name')}
                      </UserInformationText>
                      <UserInformationText>{userFullName}</UserInformationText>
                      <UserInformationText strong>
                        {t('username')}
                      </UserInformationText>
                      <UserInformationText>{userUsername}</UserInformationText>
                      <UserInformationText strong>
                        {t('email')}
                      </UserInformationText>
                      <UserInformationText>{userEmail}</UserInformationText>

                      <FormTitle>{t('header.change_username')}</FormTitle>
                      <ChangeUsernameForm formLayout={formLayout} />

                      <DeleteAccountContainer>
                        <FormTitle>{t('header.delete_account')}</FormTitle>
                        <SubmitButton
                          type="primary"
                          onClick={() => setShowDeleteForm(true)}
                        >
                          {t('continue')}
                        </SubmitButton>
                      </DeleteAccountContainer>
                      <Modal
                        visible={showDeleteForm}
                        footer={null}
                        onCancel={() => setShowDeleteForm(false)}
                      >
                        <Typography.Title level={2}>
                          {t('delete_account_modal.title')}
                        </Typography.Title>
                        <Typography.Paragraph>
                          {t('delete_account_modal.confirmation')}
                        </Typography.Paragraph>
                        <DeleteAccountForm />
                      </Modal>
                    </Col>

                    <Col span={1} />

                    <Col span={cSpan}>
                      <FormTitle>{t('header.change_email')}</FormTitle>
                      <ChangeEmailForm formLayout={formLayout} />

                      <FormTitle>{t('header.change_password')}</FormTitle>
                      <ChangePasswordForm formLayout={formLayout} />
                    </Col>
                  </Row>
                </SettingsContainer>
              </PageLayout>
            );
          case WindowTypes.Mobile:
            return (
              <MobileSettingsContainer>
                <PageHeader pageTitle={t('title')} isMobile={true} />
                <FormTitle>{t('header.profile')}</FormTitle>
                <UserInformationText>{userFullName}</UserInformationText>
                <UserInformationText>{userEmail}</UserInformationText>
                <FormTitle>{t('header.change_username')}</FormTitle>
                <ChangeUsernameForm formLayout={formLayout} />

                <FormTitle>{t('header.change_email')}</FormTitle>
                <ChangeEmailForm formLayout={formLayout} />

                <FormTitle>{t('header.change_password')}</FormTitle>
                <ChangePasswordForm formLayout={formLayout} />

                <FormTitle>{t('header.delete_account')}</FormTitle>
                <SubmitButton
                  type="primary"
                  onClick={() => setShowDeleteForm(true)}
                >
                  {t('continue')}
                </SubmitButton>
                <Modal
                  visible={showDeleteForm}
                  footer={null}
                  onCancel={() => setShowDeleteForm(false)}
                >
                  <Typography.Title level={2}>
                    {t('delete_account_modal.title')}
                  </Typography.Title>
                  <Typography.Paragraph>
                    {t('delete_account_modal.confirmation')}
                  </Typography.Paragraph>
                  <DeleteAccountForm />
                </Modal>
              </MobileSettingsContainer>
            );
        }
      })()}
    </>
  );
};

export default Settings;
