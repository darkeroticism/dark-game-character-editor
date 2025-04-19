import { Table } from '@mantine/core';
import { HaruuriFluctuatedParameterInfo } from '../DohnaDohna/data';
import { Attribute } from '../DohnaDohna/Attribute';

type Props = {
  attributes: Attribute[];
};

export const AttributeDetailTable = ({ attributes }: Props) => {
  return (
    <Table
      withTableBorder
      withColumnBorders
      styles={{
        thead: { backgroundColor: 'var(--mantine-color-pink-5)' },
        th: { color: 'white' },
      }}
    >
      <Table.Thead>
        <Table.Tr>
          <Table.Th>属性</Table.Th>
          <Table.Th>ルックス基礎値</Table.Th>
          <Table.Th>テクニック基礎値</Table.Th>
          <Table.Th>メンタル基礎値</Table.Th>
          <Table.Th>ルックス変動値</Table.Th>
          <Table.Th>テクニック変動値</Table.Th>
          <Table.Th>メンタル変動値</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody>
        {attributes.map((attr, index) => (
          <Table.Tr style={{ backgroundColor: 'var(--mantine-color-white-5)' }} key={index}>
            <Table.Td>{attr.name}</Table.Td>
            <Table.Td>{attr.basicLooks !== 0 ? attr.basicLooks : ''}</Table.Td>
            <Table.Td>{attr.basicTechnic !== 0 ? attr.basicTechnic : ''}</Table.Td>
            <Table.Td>{attr.basicMental !== 0 ? attr.basicMental : ''}</Table.Td>
            <Table.Td style={{ color: attr.fluctuatedLooks < 0 ? 'red' : undefined }}>
              {attr.fluctuatedLooks !== 0 ? attr.fluctuatedLooks : ''}
            </Table.Td>
            <Table.Td style={{ color: attr.fluctuatedTechnic < 0 ? 'red' : undefined }}>
              {attr.fluctuatedTechnic !== 0 ? attr.fluctuatedTechnic : ''}
            </Table.Td>
            <Table.Td style={{ color: attr.fluctuatedMental < 0 ? 'red' : undefined }}>
              {attr.fluctuatedMental !== 0 ? attr.fluctuatedMental : ''}
            </Table.Td>
          </Table.Tr>
        ))}
        {/* 合計値の行 */}
        <Table.Tr style={{ backgroundColor: 'var(--mantine-color-yellow-5)' }}>
          <Table.Td fw={700}>合計</Table.Td>
          <Table.Td fw={700}>{attributes.reduce((sum, attr) => sum + attr.basicLooks, 0)}</Table.Td>
          <Table.Td fw={700}>
            {attributes.reduce((sum, attr) => sum + attr.basicTechnic, 0)}
          </Table.Td>
          <Table.Td fw={700}>
            {attributes.reduce((sum, attr) => sum + attr.basicMental, 0)}
          </Table.Td>
          <Table.Td
            fw={700}
            style={{
              color:
                attributes.reduce((sum, attr) => sum + attr.fluctuatedLooks, 0) < 0
                  ? 'red'
                  : undefined,
            }}
          >
            {attributes.reduce((sum, attr) => sum + attr.fluctuatedLooks, 0)}
          </Table.Td>
          <Table.Td
            fw={700}
            style={{
              color:
                attributes.reduce((sum, attr) => sum + attr.fluctuatedTechnic, 0) < 0
                  ? 'red'
                  : undefined,
            }}
          >
            {attributes.reduce((sum, attr) => sum + attr.fluctuatedTechnic, 0)}
          </Table.Td>
          <Table.Td
            fw={700}
            style={{
              color:
                attributes.reduce((sum, attr) => sum + attr.fluctuatedMental, 0) < 0
                  ? 'red'
                  : undefined,
            }}
          >
            {attributes.reduce((sum, attr) => sum + attr.fluctuatedMental, 0)}
          </Table.Td>
        </Table.Tr>

        {/* ハルウリ基礎変動値の行 */}
        <Table.Tr style={{ backgroundColor: 'var(--mantine-color-white-5)' }}>
          <Table.Td fw={700}>ハルウリ基礎変動値</Table.Td>
          <Table.Td></Table.Td>
          <Table.Td></Table.Td>
          <Table.Td></Table.Td>
          <Table.Td style={{ color: HaruuriFluctuatedParameterInfo.looks < 0 ? 'red' : undefined }}>
            {HaruuriFluctuatedParameterInfo.looks}
          </Table.Td>
          <Table.Td
            style={{ color: HaruuriFluctuatedParameterInfo.technic < 0 ? 'red' : undefined }}
          >
            {HaruuriFluctuatedParameterInfo.technic}
          </Table.Td>
          <Table.Td
            style={{ color: HaruuriFluctuatedParameterInfo.mental < 0 ? 'red' : undefined }}
          >
            {HaruuriFluctuatedParameterInfo.mental}
          </Table.Td>
        </Table.Tr>

        {/* ハルウリ変動値（合計値＋ハルウリ基礎変動値）の行 */}
        <Table.Tr style={{ backgroundColor: 'var(--mantine-color-yellow-5)' }}>
          <Table.Td fw={700}>ハルウリ変動値</Table.Td>
          <Table.Td fw={700}></Table.Td>
          <Table.Td fw={700}></Table.Td>
          <Table.Td fw={700}></Table.Td>
          <Table.Td
            fw={700}
            style={{
              color:
                attributes.reduce((sum, attr) => sum + attr.fluctuatedLooks, 0) +
                  HaruuriFluctuatedParameterInfo.looks <
                0
                  ? 'red'
                  : undefined,
            }}
          >
            {attributes.reduce((sum, attr) => sum + attr.fluctuatedLooks, 0) +
              HaruuriFluctuatedParameterInfo.looks}
          </Table.Td>
          <Table.Td
            fw={700}
            style={{
              color:
                attributes.reduce((sum, attr) => sum + attr.fluctuatedTechnic, 0) +
                  HaruuriFluctuatedParameterInfo.technic <
                0
                  ? 'red'
                  : undefined,
            }}
          >
            {attributes.reduce((sum, attr) => sum + attr.fluctuatedTechnic, 0) +
              HaruuriFluctuatedParameterInfo.technic}
          </Table.Td>
          <Table.Td
            fw={700}
            style={{
              color:
                attributes.reduce((sum, attr) => sum + attr.fluctuatedMental, 0) +
                  HaruuriFluctuatedParameterInfo.mental <
                0
                  ? 'red'
                  : undefined,
            }}
          >
            {attributes.reduce((sum, attr) => sum + attr.fluctuatedMental, 0) +
              HaruuriFluctuatedParameterInfo.mental}
          </Table.Td>
        </Table.Tr>
      </Table.Tbody>
    </Table>
  );
};
