import React, { useState } from 'react';
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
} from '../../utils/stringFormat';
import { EditButton, StyledClose } from '../careEntry';
import UpdateSiteForm from '../forms/updateSiteForm';
import { SiteEntriesRequest, UpdateSiteRequest } from '../forms/ducks/types';

interface SiteEntryTableProps {
  readonly siteEntries: SiteEntry[];
  readonly getSite: () => void;
}

const SiteEntryTable: React.FC<SiteEntryTableProps> = ({
  siteEntries,
  getSite,
}) => {
  const [showEditEntryModal, setShowEditEntryModal] = useState<boolean>(false);
  const [selectedEntryId, setSelectedEntryId] = useState<number>();

  const [editSiteEntryForm] = Form.useForm();

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
                setSelectedEntryId(record.id);
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
    if (!selectedEntryId) {
      return;
    }

    const entries: SiteEntriesRequest = {
      ...request,
      plantingDate: request.plantingDate?.format('L') || null,
    };

    ProtectedClient.editSiteEntry(selectedEntryId, entries)
      .then(() => {
        message.success('Site entry updated!').then();
        setShowEditEntryModal(false);
        getSite();
      })
      .catch((err) => message.error(err.response.data));
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
        bodyStyle={{ paddingBottom: '5px' }}
        title={'Edit site entry'}
        open={showEditEntryModal}
        onCancel={() => setShowEditEntryModal(false)}
        closeIcon={<StyledClose />}
        footer={null}
      >
        <UpdateSiteForm
          form={editSiteEntryForm}
          onFinish={onSubmitEditSiteEntry}
          latestSiteEntry={
            selectedEntryId ? siteEntries[selectedEntryId] : undefined
          }
        />
      </Modal>
    </>
  );
};

export default SiteEntryTable;

// TODO
// Fix typescript error
// Test that form works correctly
// Provide deafult values for non-radio buttons (e.g. planting date, material in pit)
