import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useMemo,
  useState,
} from 'react';
import { Table, Card, Row, Col, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { NEIGHBORHOOD_IDS } from '../../assets/content';
import {
  FilteredSiteImage,
  FilterImageTableData,
} from '../../containers/reviewImages/types';
import styled from 'styled-components';
import ImageApprovalModal from '../imageApprovalModal';

interface UnapprovedImagesTable {
  readonly fetchData: FilteredSiteImage[];
  readonly setSelectedImageIds: React.Dispatch<SetStateAction<number[]>>;
  readonly useGridView: boolean;
  readonly approvedOrRejectedImageIds: number[];
  readonly setApprovedOrRejectedImageIds: Dispatch<SetStateAction<number[]>>;
}

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

interface ModalCardProps {
  image: string;
  siteId: number;
  species: string;
}

const ModalLinkCard: React.FC<PropsWithChildren<ModalCardProps>> = ({
  image,
  siteId,
  species,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <ImageCard
      style={{ backgroundImage: `url(${image})`, position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
        {isHovered && (
          <div style={{ color: 'black' }}>
            <b>Species:</b>
            <br />
            {species}
          </div>
        )}
      </div>
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#A7EE31C7',
            zIndex: 0,
            borderRadius: '10px',
          }}
        />
      )}
    </ImageCard>
  );
};
const columns: ColumnsType<FilterImageTableData> = [
  {
    title: 'Preview',
    dataIndex: 'preview_url',
    key: 'preview_url',
    render: (dataIndexValue, record) => {
      return <img style={{ height: 60, width: 60 }} src={record.preview}></img>;
    },
  },
  {
    title: 'Site ID',
    dataIndex: 'siteId',
    key: 'siteId',
  },
  {
    title: 'Species',
    dataIndex: 'species',
    key: 'species',
  },
  {
    title: 'Neighborhood',
    dataIndex: 'neighborhood',
    key: 'neighborhood',
  },
  {
    title: 'Date Submitted',
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
  const filteredData = useMemo(
    () =>
      fetchData
        ? fetchData.filter(
            (data) => !approvedOrRejectedImageIds.includes(data.imageId),
          )
        : [],
    [fetchData, approvedOrRejectedImageIds],
  );

  const tableData = useMemo(
    () => (filteredData ? filteredData.map(responseToTableData) : []),
    [filteredData],
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [approveImageModalOpen, setApproveImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] =
    useState<FilterImageTableData | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const closeApprovalModal = () => {
    setApproveImageModalOpen(false);
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
          <Row gutter={[16, 16]}>
            {displayedData.map((data) => (
              // tslint:disable-next-line:no-console
              <Col
                key={data.key}
                span={8}
                onClick={() => openApproveImageModal(data)}
              >
                <ModalLinkCard
                  image={data.preview}
                  siteId={data.siteId}
                  species={data.species}
                />
              </Col>
            ))}
          </Row>
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
