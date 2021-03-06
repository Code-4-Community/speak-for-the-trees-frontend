import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Button, Typography, Modal } from 'antd';
import PageHeader from '../../components/pageHeader';
import PageLayout from '../../components/pageLayout';
import styled from 'styled-components';
import { MID_GREEN } from '../../utils/colors';
import { C4CState } from '../../store';
import { getUserEmail, getUserFullName } from '../../auth/ducks/selectors';
import ChangeUsernameForm from '../../components/forms/changeUsernameForm';
import DeleteAccountForm from '../../components/forms/deleteAccountForm';
import ChangeEmailForm from '../../components/forms/changeEmailForm';
import ChangePasswordForm from '../../components/forms/changePasswordForm';
import useWindowDimensions, {
  WindowTypes,
} from '../../components/windowDimensions';
import { Helmet } from 'react-helmet';
const { Paragraph, Title } = Typography;

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

const FormTitle = styled(Paragraph)`
  margin-top: 45px;
  font-size: 20px;
  font-weight: bold;
  color: ${MID_GREEN};
  line-height: 28px;
`;

const UserInformationText = styled(Paragraph)`
  font-size: 15px;
`;

const Settings: React.FC = () => {
  const [showDeleteForm, setShowDeleteForm] = useState<boolean>(false);
  const { windowType } = useWindowDimensions();
  const userFullName = useSelector((state: C4CState) =>
    getUserFullName(state.authenticationState.userData),
  );
  const userEmail = useSelector((state: C4CState) =>
    getUserEmail(state.authenticationState.userData),
  );

  return (
    <>
      <Helmet>
        <title>Settings</title>
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
                  <PageHeader pageTitle="Account Settings" />

                  <Row>
                    <Col span={cSpan}>
                      <FormTitle>Profile</FormTitle>
                      <UserInformationText>{userFullName}</UserInformationText>
                      <UserInformationText>{userEmail}</UserInformationText>
                      <FormTitle>Change Username</FormTitle>
                      <ChangeUsernameForm formLayout={formLayout} />

                      <FormTitle>Deactivate or Delete Account</FormTitle>
                      <SubmitButton
                        type="primary"
                        onClick={() => setShowDeleteForm(true)}
                      >
                        Continue
                      </SubmitButton>
                      <Modal
                        visible={showDeleteForm}
                        footer={null}
                        onCancel={() => setShowDeleteForm(false)}
                      >
                        <Title level={2}>Delete Account</Title>
                        <Paragraph>
                          Enter your password to confirm you'd like to
                          permanently delete your account!
                        </Paragraph>
                        <DeleteAccountForm />
                      </Modal>
                    </Col>

                    <Col span={1} />

                    <Col span={cSpan}>
                      <FormTitle>Change Email</FormTitle>
                      <ChangeEmailForm formLayout={formLayout} />

                      <FormTitle>Change Password</FormTitle>
                      <ChangePasswordForm formLayout={formLayout} />
                    </Col>
                  </Row>
                </SettingsContainer>
              </PageLayout>
            );
          case WindowTypes.Mobile:
            return (
              <MobileSettingsContainer>
                <PageHeader pageTitle="Account Settings" isMobile={true} />
                <FormTitle>Profile</FormTitle>
                <UserInformationText>{userFullName}</UserInformationText>
                <UserInformationText>{userEmail}</UserInformationText>
                <FormTitle>Change Username</FormTitle>
                <ChangeUsernameForm formLayout={formLayout} />

                <FormTitle>Deactivate or Delete Account</FormTitle>
                <SubmitButton
                  type="primary"
                  onClick={() => setShowDeleteForm(true)}
                >
                  Continue
                </SubmitButton>
                <Modal
                  visible={showDeleteForm}
                  footer={null}
                  onCancel={() => setShowDeleteForm(false)}
                >
                  <Title level={2}>Delete Account</Title>
                  <Paragraph>
                    Enter your password to confirm you'd like to permanently
                    delete your account!
                  </Paragraph>
                  <DeleteAccountForm />
                </Modal>

                <FormTitle>Change Email</FormTitle>
                <ChangeEmailForm formLayout={formLayout} />

                <FormTitle>Change Password</FormTitle>
                <ChangePasswordForm formLayout={formLayout} />
              </MobileSettingsContainer>
            );
        }
      })()}
    </>
  );
};

export default Settings;
