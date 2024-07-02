import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { Table, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { NEIGHBORHOOD_IDS } from '../../assets/content';
import {
  FilteredSiteImage,
  FilterImageTableData,
} from '../../containers/reviewImages/types';
import styled from 'styled-components';
import ImageApprovalModal from '../imageApprovalModal';
import { CheckOutlined } from '@ant-design/icons';
import { Flex } from '../themedComponents';
import { useTranslation } from 'react-i18next';
import { n } from '../../utils/stringFormat';
import { site } from '../../constants';
import i18n from '../../i18n/i18n';

const tg = i18n.t;

interface UnapprovedImagesTable {
  readonly fetchData: FilteredSiteImage[];
  readonly setSelectedImageIds: React.Dispatch<SetStateAction<number[]>>;
  readonly useGridView: boolean;
  readonly approvedOrRejectedImageIds: number[];
  readonly setApprovedOrRejectedImageIds: Dispatch<SetStateAction<number[]>>;
}

const ImageCard = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  background-blend-mode: darken;
  border-radius: 10px;
  width: 200px;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  background-size: cover;
  font-size: 16pt;
  font-weight: bold;
  transition: background-color 0.2s;
  text-align: center;

  &:hover {
    background-color: rgba(226, 254, 170, 0.5);
    background-blend-mode: multiply;
  }
`;

const ImageHighlightOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #a7ee31bb;
  z-index: 0;
  border-radius: 10px;
`;

interface ModalCardProps {
  image: string;
  siteId: number;
  species: string;
  isSelected: boolean;
}

const ModalLinkCard: React.FC<PropsWithChildren<ModalCardProps>> = ({
  image,
  siteId,
  species,
  children,
  isSelected,
}) => {
  const { t } = useTranslation(n(site, ['admin']), { nsMode: 'fallback' });
  const [isHovered, setIsHovered] = useState(false);

  // Display species if hovered, and check if selected. Hover text takes precedence.
  const overlayContent = isHovered ? (
    <div style={{ color: 'black' }}>
      <b>{`${t('review_images.summary.species')}:`}</b>
      <br />
      {species}
    </div>
  ) : isSelected ? (
    <CheckOutlined style={{ fontSize: '70px', fontWeight: 'bold' }} />
  ) : (
    <></>
  );

  return (
    <ImageCard
      style={{ backgroundImage: `url(${image})`, position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
        {overlayContent}
      </div>
      {(isHovered || isSelected) && <ImageHighlightOverlay />}
    </ImageCard>
  );
};
const columns: ColumnsType<FilterImageTableData> = [
  {
    title: tg('review_images.summary.preview', { ns: 'admin' }),
    dataIndex: 'preview_url',
    key: 'preview_url',
    render: (dataIndexValue, record) => {
      return <img style={{ height: 60, width: 60 }} src={record.preview}></img>;
    },
  },
  {
    title: tg('review_images.summary.id', { ns: 'admin' }),
    dataIndex: 'siteId',
    key: 'siteId',
  },
  {
    title: tg('review_images.summary.species', { ns: 'admin' }),
    dataIndex: 'species',
    key: 'species',
  },
  {
    title: tg('review_images.summary.neighborhood', { ns: 'admin' }),
    dataIndex: 'neighborhood',
    key: 'neighborhood',
  },
  {
    title: tg('review_images.summary.date', { ns: 'admin' }),
    dataIndex: 'dateSubmitted',
    key: 'dateSubmitted',
  },
];

function responseToTableData(
  data: FilteredSiteImage,
  index: number,
): FilterImageTableData {
  return {
    key: data.imageId,
    preview: data.imageUrl,
    siteId: data.siteId,
    dateSubmitted: data.dateSubmitted,
    species: data.commonName,
    neighborhood: NEIGHBORHOOD_IDS[data.neighborhoodId],
    submittedBy: data.uploaderName,
    address: data.address,
  };
}

const UnapprovedImagesTable: React.FC<UnapprovedImagesTable> = ({
  fetchData,
  setSelectedImageIds,
  useGridView,
  approvedOrRejectedImageIds,
  setApprovedOrRejectedImageIds,
}) => {
  const tableData = useMemo(() => {
    const filteredData = fetchData
      ? fetchData.filter(
          (data) => !approvedOrRejectedImageIds.includes(data.imageId),
        )
      : [];

    return filteredData ? filteredData.map(responseToTableData) : [];
  }, [fetchData, approvedOrRejectedImageIds]);

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [approveImageModalOpen, setApproveImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] =
    useState<FilterImageTableData | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const TableView = () => {
    return (
      <Table
        columns={columns}
        dataSource={tableData}
        size="middle"
        rowSelection={{
          selectedRowKeys,
          onChange: (_, selectedRows) => {
            setSelectedImageIds(selectedRows.map((row) => row.key));
            setSelectedRowKeys(selectedRows.map((row) => row.key));
          },
        }}
      />
    );
  };

  const openApproveImageModal = (data: FilterImageTableData) => {
    setApproveImageModalOpen(true);
    setSelectedImage(data);
  };

  const GridView = () => {
    const pageSize = 9; // Number of cards per page
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedData = tableData.slice(startIndex, endIndex);

    return (
      <>
        <div>
          <Flex justifyContent="space-between" gap="15px 50px">
            {displayedData.map((data) => (
              <div key={data.key} onClick={() => openApproveImageModal(data)}>
                <ModalLinkCard
                  image={data.preview}
                  siteId={data.siteId}
                  species={data.species}
                  isSelected={selectedRowKeys.includes(data.key)}
                />
              </div>
            ))}
          </Flex>
          <Pagination
            current={currentPage}
            total={tableData.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: '16px' }}
          />
        </div>
        <ImageApprovalModal
          visible={approveImageModalOpen}
          onClose={() => setApproveImageModalOpen(false)}
          tableData={selectedImage}
          approvedOrRejectedImageIds={approvedOrRejectedImageIds}
          setApprovedOrRejectedImageIds={setApprovedOrRejectedImageIds}
          allData={tableData}
          setSelectedImage={setSelectedImage}
        />
      </>
    );
  };

  return useGridView ? <GridView /> : <TableView />;
};

export default UnapprovedImagesTable;
