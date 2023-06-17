import React, { useEffect, useState } from 'react';
import {
  SiteEntry,
  SiteEntryField,
  SiteEntryFields,
} from '../../containers/treePage/ducks/types';
import { Form, Modal, Table, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import ProtectedClient from '../../api/protectedApiClient';
import {
  booleanToString,
  getSEFieldDisplayName,
  n,
} from '../../utils/stringFormat';
import { EditButton, StyledClose } from '../careEntry';
import UpdateSiteForm from '../forms/updateSiteForm';
import { SiteEntriesRequest, UpdateSiteRequest } from '../forms/ducks/types';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import moment from 'moment';

interface SiteEntryTableProps {
  readonly siteEntries: SiteEntry[];
  readonly getSite: () => void;
}

const SiteEntryTable: React.FC<SiteEntryTableProps> = ({
  siteEntries,
  getSite,
}) => {
  const { t } = useTranslation(n(site, ['site', 'forms']), {
    nsMode: 'fallback',
  });

  const [showEditEntryModal, setShowEditEntryModal] = useState<boolean>(false);
  const [editEntryModalData, setEditEntryModalData] = useState<SiteEntry>();

  const [editSiteEntryForm] = Form.useForm();

  useEffect(() => {
    editSiteEntryForm.setFieldsValue({
      ...editEntryModalData,
      plantingDate: editEntryModalData?.plantingDate
        ? moment(editEntryModalData?.plantingDate)
        : null,
    });
  }, [editSiteEntryForm, editEntryModalData]);

  const siteEntryTableColumns = Object.values(SiteEntryFields).map(
    (field: SiteEntryField) => {
      return {
        title: getSEFieldDisplayName(field),
        dataIndex: field,
        key: field,
        render: (
          val: string | number | boolean,
          record: SiteEntry,
        ): string | JSX.Element => {
          if (field !== 'editEntry') {
            return val || val === false ? booleanToString(String(val)) : '';
          }

          return (
            <EditButton
              type="primary"
              onClick={() => {
                setShowEditEntryModal(true);
                setEditEntryModalData(record);
              }}
            >
              <EditOutlined />
            </EditButton>
          );
        },
      };
    },
  );

  const onSubmitEditSiteEntry = (request: UpdateSiteRequest) => {
    if (!editEntryModalData) {
      return;
    }

    const entries: SiteEntriesRequest = {
      ...request,
      plantingDate: request.plantingDate?.format('L') || null,
    };

    ProtectedClient.editSiteEntry(editEntryModalData.id, entries)
      .then(() => {
        message.success(t('edit_site_entry.success'));
        setShowEditEntryModal(false);
        getSite();
      })
      .catch((err) =>
        message.error(t('edit_site_entry.error', { error: err.response.data })),
      );
  };

  return (
    <>
      <Table
        dataSource={siteEntries}
        columns={siteEntryTableColumns}
        scroll={{ x: 1300 }}
        rowKey={(siteEntry: SiteEntry) => siteEntry.id}
      />

      <Modal
        title={t('edit_site_entry')}
        open={showEditEntryModal}
        onCancel={() => {
          setShowEditEntryModal(false);
          editSiteEntryForm.resetFields();
        }}
        closeIcon={<StyledClose />}
        footer={null}
        width="80vw"
      >
        <UpdateSiteForm
          formInstance={editSiteEntryForm}
          onFinish={onSubmitEditSiteEntry}
          initialSiteEntry={editEntryModalData}
        />
      </Modal>
    </>
  );
};

export default SiteEntryTable;
