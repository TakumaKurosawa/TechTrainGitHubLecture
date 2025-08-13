import React, { useMemo } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { MapPin, Calendar, DollarSign, Star, Clock } from 'lucide-react';
import { useInternshipStore } from '../../store/internship-store';
import type { Internship } from '../../types';

const ListContainer = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const ListHeader = styled.div`
  padding: 24px;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const ListTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ResultsCount = styled.span`
  font-size: 14px;
  color: #6b7280;
`;

const SortControls = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SortLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const SortSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background-color: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const InternshipGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
`;

const InternshipCard = styled(motion.div)`
  padding: 24px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f9fafb;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
  gap: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const CardTitle = styled.h3`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0 0 4px 0;
  line-height: 1.3;
`;

const CompanyName = styled.p`
  font-size: 16px;
  font-weight: 500;
  color: #3b82f6;
  margin: 0;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #fef3c7;
  padding: 4px 8px;
  border-radius: 4px;
  white-space: nowrap;
`;

const RatingText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #92400e;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  margin: 0 0 16px 0;
  line-height: 1.5;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 4px 8px;
  background-color: #eff6ff;
  color: #1d4ed8;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const CardFooter = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  color: #6b7280;
`;

const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  color: #9ca3af;
`;

const EmptyState = styled.div`
  padding: 48px 24px;
  text-align: center;
  color: #6b7280;
`;

const EmptyTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0 0 8px 0;
`;

const EmptyDescription = styled.p`
  font-size: 14px;
  margin: 0;
`;

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const formatSalary = (salary?: number): string => {
  if (!salary) return '応相談';
  return `月額 ${salary.toLocaleString()}円`;
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

interface InternshipCardItemProps {
  internship: Internship;
}

const InternshipCardItem: React.FC<InternshipCardItemProps> = ({ internship }) => {
  return (
    <InternshipCard
      variants={cardVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <CardHeader>
        <div>
          <CardTitle>{internship.internshipName}</CardTitle>
          <CompanyName>{internship.companyName}</CompanyName>
        </div>
        <RatingContainer>
          <Star size={14} fill="#f59e0b" color="#f59e0b" />
          <RatingText>{internship.rating.toFixed(1)}</RatingText>
        </RatingContainer>
      </CardHeader>

      <Description>{internship.description}</Description>

      <TagsContainer>
        {internship.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagsContainer>

      <CardFooter>
        <InfoItem>
          <InfoIcon>
            <MapPin size={16} />
          </InfoIcon>
          {internship.location}
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <Clock size={16} />
          </InfoIcon>
          期間: {internship.duration}
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <DollarSign size={16} />
          </InfoIcon>
          {formatSalary(internship.salary)}
        </InfoItem>

        <InfoItem>
          <InfoIcon>
            <Calendar size={16} />
          </InfoIcon>
          締切: {formatDate(internship.applicationDeadline)}
        </InfoItem>
      </CardFooter>
    </InternshipCard>
  );
};

export const InternshipList: React.FC = () => {
  const { 
    filteredInternships, 
    sortBy, 
    sortOrder, 
    setSorting,
    searchFilters 
  } = useInternshipStore();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [newSortBy, newSortOrder] = e.target.value.split('-');
    setSorting(newSortBy as any, newSortOrder as any);
  };

  const sortValue = `${sortBy}-${sortOrder}`;

  const hasActiveFilters = useMemo(() => {
    return (
      searchFilters.query.trim() !== '' ||
      searchFilters.companyName.trim() !== '' ||
      searchFilters.tags.length > 0 ||
      searchFilters.minRating > 0 ||
      searchFilters.maxRating < 5 ||
      searchFilters.location.trim() !== '' ||
      searchFilters.salaryRange[0] > 0 ||
      searchFilters.salaryRange[1] < 1000000
    );
  }, [searchFilters]);

  return (
    <ListContainer>
      <ListHeader>
        <div>
          <ListTitle>インターンシップ一覧</ListTitle>
          <ResultsCount>
            {filteredInternships.length}件の結果
            {hasActiveFilters && ' （フィルター適用済み）'}
          </ResultsCount>
        </div>

        <SortControls>
          <SortLabel>並び替え:</SortLabel>
          <SortSelect value={sortValue} onChange={handleSortChange}>
            <option value="rating-desc">評価: 高い順</option>
            <option value="rating-asc">評価: 低い順</option>
            <option value="deadline-asc">締切: 近い順</option>
            <option value="deadline-desc">締切: 遠い順</option>
            <option value="salary-desc">給与: 高い順</option>
            <option value="salary-asc">給与: 低い順</option>
            <option value="name-asc">名前: A-Z順</option>
            <option value="name-desc">名前: Z-A順</option>
          </SortSelect>
        </SortControls>
      </ListHeader>

      {filteredInternships.length === 0 ? (
        <EmptyState>
          <EmptyTitle>該当するインターンシップが見つかりません</EmptyTitle>
          <EmptyDescription>
            検索条件やフィルターを調整して再度お試しください。
          </EmptyDescription>
        </EmptyState>
      ) : (
        <InternshipGrid>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredInternships.map((internship) => (
              <InternshipCardItem
                key={internship.id}
                internship={internship}
              />
            ))}
          </motion.div>
        </InternshipGrid>
      )}
    </ListContainer>
  );
};