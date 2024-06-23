import React, { useState } from 'react';
import {
  SiteEntry,
  SiteEntryField,
  SiteEntryFields,
} from '../../containers/treePage/ducks/types';
import { Form, Modal, Table, message } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import ProtectedClient from '../../api/protectedApiClient';
import {
  booleanToString,
  getSEFieldDisplayName,
  n,
} from '../../utils/stringFormat';
import { EditButton, StyledClose, DeleteButton } from '../themedComponents';
import UpdateSiteForm from '../forms/updateSiteForm';
import { SiteEntriesRequest, UpdateSiteRequest } from '../forms/ducks/types';
import { useTranslation } from 'react-i18next';
import { site } from '../../constants';
import moment from 'moment';

interface SiteEntryTableProps {
  siteEntries: SiteEntry[];
  getSite: () => void;
}

const SiteEntryTable: React.FC<SiteEntryTableProps> = ({
  siteEntries,
  getSite,
}) => {
  const { t } = useTranslation(n(site, ['site', 'forms']), {
    nsMode: 'fallback',
  });

  const [showEditEntryModal, setShowEditEntryModal] = useState<boolean>(false);
  const [editEntryModalData, setEditEntryModalData] = useState<
    SiteEntry | undefined
  >();

  const [editSiteEntryForm] = Form.useForm();

  // Columns configuration for the Ant Design Table
  const siteEntryTableColumns = Object.values(SiteEntryFields).map(
    (field: SiteEntryField) => {
      if (field === 'editEntry') {
        return {
          title: getSEFieldDisplayName(field),
          dataIndex: field,
          key: field,
          render: (
            val: string | number | boolean,
            record: SiteEntry,
          ): JSX.Element => (
            <EditButton type="primary" onClick={() => handleEditEntry(record)}>
              <EditOutlined />
            </EditButton>
          ),
        };
      } else if (field === 'deleteEntry') {
        return {
          title: getSEFieldDisplayName(field),
          dataIndex: field,
          key: field,
          render: (
            val: string | number | boolean,
            record: SiteEntry,
          ): JSX.Element => (
            <DeleteButton
              type="primary"
              onClick={() => onDeleteSiteEntry(record.id)}
            >
              <DeleteOutlined />
            </DeleteButton>
          ),
        };
      } else {
        return {
          title: getSEFieldDisplayName(field),
          dataIndex: field,
          key: field,
          render: (val: string | number | boolean): string =>
            val || val === false ? booleanToString(String(val)) : '',
        };
      }
    },
  );

  // Function to handle edit button click
  const handleEditEntry = (record: SiteEntry) => {
    setShowEditEntryModal(true);
    setEditEntryModalData(record);

    // Set initial form values
    editSiteEntryForm.setFieldsValue({
      ...record,
      plantingDate: record?.plantingDate ? moment(record?.plantingDate) : null,
    });
  };

  // Function to handle form submission for editing
  const onSubmitEditSiteEntry = (values: UpdateSiteRequest) => {
    if (!editEntryModalData) {
      return;
    }

    const updatedEntry: SiteEntriesRequest = {
      ...values,
      plantingDate: values.plantingDate?.format('L') || null,
    };

    ProtectedClient.editSiteEntry(editEntryModalData.id, updatedEntry)
      .then(() => {
        message.success(t('edit_site_entry.success'));
        setShowEditEntryModal(false);
        getSite(); // Refresh site entries after successful edit
      })
      .catch((err) => {
        message.error(t('edit_site_entry.error', { error: err.response.data }));
      });
  };

  // Function to handle deletion of a site entry
  const onDeleteSiteEntry = (siteEntryId: number) => {
    ProtectedClient.deleteSiteEntry(siteEntryId)
      .then(() => {
        message.success('Successfully deleted site entry.');
        const updatedSiteEntries = siteEntries.filter(
          (entry) => entry.id !== siteEntryId,
        );
        getSite(); // Refresh site entries after successful deletion
      })
      .catch((err) => {
        message.error(
          t('delete_site_entry.error', { error: err.response.data }),
        );
      });
  };

  return (
    <>
      <Table
        dataSource={siteEntries}
        columns={siteEntryTableColumns}
        scroll={{ x: 1300 }}
        rowKey={(siteEntry: SiteEntry) => siteEntry.id.toString()} // Ensure rowKey is a string
      />

      <Modal
        title={t('edit_site_entry')}
        visible={showEditEntryModal} // Use 'visible' to control visibility
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
