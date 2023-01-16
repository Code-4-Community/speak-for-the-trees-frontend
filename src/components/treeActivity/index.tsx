import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Typography,
  List,
  Select,
  Pagination,
  message,
  Modal,
  Button,
} from 'antd';
import {
  MonthYearOption,
  TreeCare,
} from '../../containers/treePage/ducks/types';
import { TitleProps } from 'antd/lib/typography/Title';
import {
  DARK_GREEN,
  LIGHT_GREY,
  MID_GREEN,
  TEXT_GREY,
  WHITE,
} from '../../utils/colors';
import { UNABBREVIATED_MONTHS } from '../../assets/content';
import styled from 'styled-components';
import { LinkButton } from '../linkButton';
import protectedApiClient from '../../api/protectedApiClient';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '../../assets/images/delete-icon.png';
import { C4CState } from '../../store';
import { getPrivilegeLevel, getUserID } from '../../auth/ducks/selectors';
import { PrivilegeLevel } from '../../auth/ducks/types';

const TreeCareTitle = styled(Typography.Paragraph)`
  margin: 0px 5px;
  font-size: 26px;
  font-weight: bold;
  line-height: 26px;
  color: ${DARK_GREEN};
`;

const CareEntry = styled.div`
  margin: 15px;
`;

const EntryDate = styled(Typography.Paragraph)<TitleProps>`
  display: inline;
  text-align: center;
  line-height: 0px;
  font-size: 18px;
  font-weight: bold;
  color: ${DARK_GREEN};
`;

const EntryMessage = styled(Typography.Paragraph)`
  display: inline;
  text-align: center;
  line-height: 0px;
  color: ${TEXT_GREY};
`;

const StewardshipActivityDropdownContainer = styled.div`
  margin: -10px 0 -5px 5px;
`;

const StewardshipActivityDropdown = styled.div`
  font-size: 15px;
  color: ${MID_GREEN};
`;

const CenteredPagination = styled(Pagination)`
  display: flex;
  justify-content: center;
  & .ant-pagination-item-active {
    background-color: white;
  }
  & .ant-pagination-item-active :hover {
    background-color: ${DARK_GREEN};
  }
`;

const DeleteActivityButton = styled(LinkButton)`
  margin: 10px;
  padding-left: 10px;
  background: ${WHITE};
  border: none;
  padding-left: 10px;
  float: right;
  &:hover {
    background-color: ${LIGHT_GREY};
  }
`;

const DeleteIconStyle = styled.img`
  max-height: 25px;
  margin-bottom: 2px;
`;

const ConfirmDelete = styled(Button)`
  margin: 10px;
  padding-left: 10px;
  padding-left: 10px;
  &:hover {
    background-color: ${LIGHT_GREY};
  }
`;

interface TreeActivityProps {
  readonly stewardship: TreeCare[];
  readonly monthYearOptions: MonthYearOption[];
  readonly doesUserOwnTree: boolean;
}

const TreeActivity: React.FC<TreeActivityProps> = ({
  stewardship,
  monthYearOptions,
  doesUserOwnTree,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'short' }),
  );

  const privilegeLevel: PrivilegeLevel = useSelector((state: C4CState) =>
    getPrivilegeLevel(state.authenticationState.tokens),
  );

  const showButtons =
    doesUserOwnTree ||
    privilegeLevel === PrivilegeLevel.ADMIN ||
    privilegeLevel === PrivilegeLevel.SUPER_ADMIN;

  const [selectedActivities, setSelectedActivities] = useState(stewardship);

  useEffect(() => {
    setSelectedActivities(stewardship);
  }, [stewardship]);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const selectedMonthYearStewardship: TreeCare[] = selectedActivities.filter(
    (entry) => entry.month === selectedMonth && entry.year === selectedYear,
  );

  const selectOptions: {
    label: string;
    value: string;
  }[] = monthYearOptions.map((monthYear) => {
    return {
      label: UNABBREVIATED_MONTHS[monthYear.month] + ' ' + monthYear.year,
      value: monthYear.month + ' ' + monthYear.year,
    };
  });

  const [pageNumber, setPageNumber] = useState(0);

  const onClickDeleteActivity = (activityId: number) => {
    protectedApiClient
      .deleteStewardship(activityId)
      .then(() => {
        message.success('Stewardship Activity ' + activityId + ' Deleted');
      })
      .catch((err) => {
        message.error(
          `Failed to delete stewardship activity: ${err.response.data}`,
        );
      });

    setSelectedActivities(
      selectedActivities.filter((act) => act.activityId !== activityId),
    );
  };

  const [showForm, setShowForm] = useState<boolean>(false);
  const [activityToDelete, setActivityToDelete] = useState<number>(0);

  const DeleteModalDisplay = () => {
    return (
      <Modal
        title="Confirm Stewardship Deletion"
        visible={showForm}
        onOk={() => setShowForm(false)}
        onCancel={() => setShowForm(false)}
        footer={null}
      >
        <p>Are you sure you want to delete this stewardship activity? </p>
        <ConfirmDelete
          onClick={() => {
            onClickDeleteActivity(activityToDelete);
          }}
        >
          Delete {activityToDelete}
        </ConfirmDelete>
      </Modal>
    );
  };

  return (
    <>
      {/* {console.log(selectOptions)} */}
      <TreeCareTitle>Recent Tree Care Activity</TreeCareTitle>
      <StewardshipActivityDropdownContainer>
        <StewardshipActivityDropdown>
          Month and year to display activities for:{' '}
          <Select
            showSearch
            style={{ width: 200 }}
            onChange={(value: string) => {
              setSelectedMonth(value.substring(0, 3));
              setSelectedYear(parseInt(value.slice(-4), 10));
            }}
            defaultValue={selectedMonth + ' ' + selectedYear}
            options={selectOptions}
          />
        </StewardshipActivityDropdown>
      </StewardshipActivityDropdownContainer>
      <List
        dataSource={selectedMonthYearStewardship.slice(
          10 * pageNumber,
          10 * pageNumber + 10,
        )}
        itemLayout="vertical"
        locale={{
          emptyText: 'No Stewardship Activities Recorded for this Tree',
        }}
        renderItem={(value, key) => (
          <CareEntry key={key}>
            <Row>
              <Col span={5}>
                <EntryDate>{value.month + ' ' + value.day}</EntryDate>
              </Col>
              <Col span={1} />
              <Col span={18}>
                <EntryMessage>{value.message}</EntryMessage>
                {showButtons && (
                  <DeleteActivityButton
                    type="primary"
                    onClick={() => {
                      setShowForm(!showForm);
                      setActivityToDelete(value.activityId);
                    }}
                  >
                    <DeleteIconStyle
                      src={DeleteIcon}
                      alt="Delete Stewardship Activity"
                    />
                    {DeleteModalDisplay()}
                  </DeleteActivityButton>
                )}
              </Col>
            </Row>
          </CareEntry>
        )}
      />
      <CenteredPagination
        defaultCurrent={1}
        total={selectedMonthYearStewardship.length}
        onChange={(page: number) => {
          setPageNumber(page - 1);
        }}
        hideOnSinglePage={true}
        pageSize={10}
      />
    </>
  );
};

export default TreeActivity;
