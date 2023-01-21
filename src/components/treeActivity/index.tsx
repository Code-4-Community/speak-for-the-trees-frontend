import React, { useState } from 'react';
import moment from 'moment';
import {
  Typography,
  List,
  Select,
  Pagination,
  Button,
  Row,
  Col,
  Form,
  Modal,
} from 'antd';
import { EditOutlined, CloseOutlined } from '@ant-design/icons';
import {
  MonthYearOption,
  TreeCare,
} from '../../containers/treePage/ducks/types';
import { TitleProps } from 'antd/lib/typography/Title';
import { DARK_GREEN, MID_GREEN, TEXT_GREY } from '../../utils/colors';
import { UNABBREVIATED_MONTHS } from '../../assets/content';
import styled from 'styled-components';
import StewardshipForm from '../forms/stewardshipForm';
import { useSelector } from 'react-redux';
import {
  getPrivilegeLevel,
  isAdmin,
  getUserID,
} from '../../auth/ducks/selectors';

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

const EditButton = styled(Button)`
  color: white;
  float: right;
  font-size: 20px;
  padding: 0px 10px;
  line-height: 0px;
`;

const StyledClose = styled(CloseOutlined)`
  color: red;
  padding: 5px;
  border-radius: 3px;

  & :hover {
    background-color: #ffd1d1;
  }
`;

interface TreeActivityProps {
  readonly stewardship: TreeCare[];
  readonly monthYearOptions: MonthYearOption[];
  readonly onFinishEditStewardship: (
    activityId: number,
    form: FormInstance<RecordStewardshipRequest>,
  ) => (values: RecordStewardshipRequest) => void;
  readonly doesUserOwnTree: boolean;
}

const TreeActivity: React.FC<TreeActivityProps> = ({
  stewardship,
  monthYearOptions,
  onFinishEditStewardship,
}) => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toLocaleString('default', { month: 'short' }),
  );
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const selectedMonthYearStewardship: TreeCare[] = stewardship.filter(
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

  const [editActivityId, setEditActivityId] = useState<number>(undefined);
  const [stewardshipFormInstance] = Form.useForm();

  const userIsAdmin: boolean = useSelector((state: C4CState) =>
    isAdmin(state.authenticationState.tokens),
  );

  const userId: number = useSelector((state: C4CState) =>
    getUserID(state.authenticationState.tokens),
  );

  function showButtons(activityOwner) {
    return userIsAdmin || userId == activityOwner;
  }

  function treeCareToMoment(month: string, day: string, year: number) {
    return moment(`${month} ${day} ${year}`, 'MMM Do YYYY');
  }

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
        renderItem={(activity, key) => (
          <CareEntry key={key}>
            <Row>
              <Col span={5}>
                <EntryDate>{activity.month + ' ' + activity.day}</EntryDate>
              </Col>
              <Col span={1} />
              <Col span={18}>
                <EntryMessage>{activity.message}</EntryMessage>
                {showButtons(activity.ownerId) && (
                  <>
                    <EditButton
                      type="primary"
                      onClick={() => setEditActivityId(activity.activityId)}
                    >
                      <EditOutlined />
                    </EditButton>
                    <Modal
                      bodyStyle={{ paddingBottom: '5px' }}
                      title="Edit stewardship"
                      visible={editActivityId === activity.activityId}
                      onCancel={() => setEditActivityId(undefined)}
                      footer={null}
                      closeIcon={<StyledClose />}
                    >
                      <StewardshipForm
                        onFinish={onFinishEditStewardship(
                          activity.activityId,
                          stewardshipFormInstance,
                        )}
                        form={stewardshipFormInstance}
                        initialDate={treeCareToMoment(
                          activity.month,
                          activity.day,
                          activity.year,
                        )}
                      />
                    </Modal>
                  </>
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
