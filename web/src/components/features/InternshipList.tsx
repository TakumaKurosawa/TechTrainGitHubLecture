import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, DollarSign, Star, Calendar, Users, CheckCircle } from 'lucide-react';
import { useInternshipStore } from '../../store';
import type { Internship } from '../../types';

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
`;

const ResultsCount = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #374151;
  margin: 0;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #9ca3af;
`;

const EmptyMessage = styled.h3`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #6b7280;
`;

const EmptySubMessage = styled.p`
  font-size: 16px;
  margin: 0;
`;

const InternshipCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    border-color: #e5e7eb;
    transform: translateY(-2px);
  }
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const TitleSection = styled.div`
  flex: 1;
`;

const InternshipTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const CompanyName = styled.h5`
  font-size: 16px;
  font-weight: 600;
  color: #3b82f6;
  margin: 0 0 8px 0;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #fef3c7;
  padding: 6px 12px;
  border-radius: 20px;
  white-space: nowrap;
`;

const StarIcon = styled(Star)`
  width: 16px;
  height: 16px;
  color: #f59e0b;
  fill: #f59e0b;
`;

const Rating = styled.span`
  font-weight: 600;
  color: #92400e;
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 14px;
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 20px 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #6b7280;
  font-size: 14px;
`;

const InfoIcon = styled.div`
  color: #9ca3af;
  display: flex;
  align-items: center;
`;

const InfoText = styled.span`
  font-weight: 500;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 12px;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid #dbeafe;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #f3f4f6;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }
`;

const DeadlineInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #dc2626;
  font-size: 14px;
  font-weight: 500;
`;

const SalaryInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: #059669;
  font-size: 16px;
  font-weight: 700;
`;

const formatDeadline = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = date.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) return '締切済み';
  if (diffDays === 0) return '今日締切';
  if (diffDays === 1) return '明日締切';
  if (diffDays <= 7) return `${diffDays}日後締切`;
  
  return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} 締切`;
};

const InternshipCard: React.FC<{ internship: Internship }> = ({ internship }) => {
  return (
    <InternshipCard
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
    >
      <CardHeader>
        <TitleSection>
          <InternshipTitle>{internship.name}</InternshipTitle>
          <CompanyName>{internship.company}</CompanyName>
        </TitleSection>
        <RatingSection>
          <StarIcon />
          <Rating>{internship.rating.toFixed(1)}</Rating>
        </RatingSection>
      </CardHeader>

      <Description>{internship.description}</Description>

      <InfoGrid>
        <InfoItem>
          <InfoIcon><MapPin size={16} /></InfoIcon>
          <InfoText>{internship.location}</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoIcon><Clock size={16} /></InfoIcon>
          <InfoText>{internship.duration}</InfoText>
        </InfoItem>
        <InfoItem>
          <InfoIcon><Calendar size={16} /></InfoIcon>
          <InfoText>{internship.startDate} 〜 {internship.endDate}</InfoText>
        </InfoItem>
      </InfoGrid>

      <TagsContainer>
        {internship.tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </TagsContainer>

      <CardFooter>
        <DeadlineInfo>
          <Calendar size={16} />
          {formatDeadline(internship.applicationDeadline)}
        </DeadlineInfo>
        <SalaryInfo>
          <DollarSign size={16} />
          月額 {internship.salary}万円
        </SalaryInfo>
      </CardFooter>
    </InternshipCard>
  );
};

const InternshipList: React.FC = () => {
  const { filteredInternships } = useInternshipStore();

  return (
    <ListContainer>
      <ResultsHeader>
        <ResultsCount>
          {filteredInternships.length} 件のインターンシップが見つかりました
        </ResultsCount>
      </ResultsHeader>

      <AnimatePresence mode="popLayout">
        {filteredInternships.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <EmptyState>
              <EmptyMessage>検索条件に該当するインターンシップが見つかりませんでした</EmptyMessage>
              <EmptySubMessage>検索条件を変更して再度お試しください</EmptySubMessage>
            </EmptyState>
          </motion.div>
        ) : (
          filteredInternships.map((internship, index) => (
            <InternshipCard
              key={internship.id}
              internship={internship}
            />
          ))
        )}
      </AnimatePresence>
    </ListContainer>
  );
};

export default InternshipList;