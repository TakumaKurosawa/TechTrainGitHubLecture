import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Search, Filter, RotateCcw, ChevronDown } from 'lucide-react';
import { useInternshipStore } from '../../store';
import { availableCompanies, availableLocations, availableTags } from '../../data';

const FormContainer = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  align-items: end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const SearchInputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  width: 20px;
  height: 20px;
  color: #9ca3af;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 12px 12px 44px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const Select = styled.select`
  padding: 12px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 16px;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const RangeGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RangeInput = styled.input`
  width: 80px;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

const RangeLabel = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

const TagsContainer = styled.div`
  position: relative;
`;

const TagsInput = styled.div<{ $isOpen: boolean }>`
  min-height: 44px;
  padding: 8px 40px 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  align-items: center;
  transition: border-color 0.2s ease;

  ${props => props.$isOpen && `
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  `}
`;

const TagsPlaceholder = styled.span`
  color: #9ca3af;
  font-size: 16px;
`;

const ChevronIcon = styled(ChevronDown)<{ $isOpen: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%) ${props => props.$isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  width: 20px;
  height: 20px;
  color: #9ca3af;
  transition: transform 0.2s ease;
`;

const TagsDropdown = styled(motion.div)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  z-index: 10;
  max-height: 200px;
  overflow-y: auto;
`;

const TagOption = styled.div<{ $selected: boolean }>`
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  color: ${props => props.$selected ? '#3b82f6' : '#374151'};
  background-color: ${props => props.$selected ? '#f0f9ff' : 'white'};

  &:hover {
    background-color: #f9fafb;
  }

  &:first-child {
    border-top-left-radius: 7px;
    border-top-right-radius: 7px;
  }

  &:last-child {
    border-bottom-left-radius: 7px;
    border-bottom-right-radius: 7px;
  }
`;

const SelectedTag = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background: #3b82f6;
  color: white;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const FilterActions = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

const SortGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const IconButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f9fafb;
    border-color: #9ca3af;
  }
`;

const SearchForm: React.FC = () => {
  const {
    filters,
    setSearchText,
    setCompanyFilter,
    setLocationFilter,
    setRatingRange,
    setSalaryRange,
    setTagsFilter,
    setSorting,
    resetFilters
  } = useInternshipStore();

  const [showTagsDropdown, setShowTagsDropdown] = useState(false);

  const handleTagToggle = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    setTagsFilter(newTags);
  };

  const removeTag = (tagToRemove: string) => {
    setTagsFilter(filters.tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <FormRow>
        <FormGroup style={{ flex: 2 }}>
          <Label>検索キーワード</Label>
          <SearchInputContainer>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="インターンシップ名、企業名、技術等で検索..."
              value={filters.searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </SearchInputContainer>
        </FormGroup>

        <FormGroup>
          <Label>企業名</Label>
          <Select
            value={filters.company}
            onChange={(e) => setCompanyFilter(e.target.value)}
          >
            <option value="">すべての企業</option>
            {availableCompanies.map(company => (
              <option key={company} value={company}>{company}</option>
            ))}
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>勤務地</Label>
          <Select
            value={filters.location}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">すべての勤務地</option>
            {availableLocations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </Select>
        </FormGroup>
      </FormRow>

      <FormRow>
        <FormGroup>
          <Label>評価</Label>
          <RangeGroup>
            <RangeInput
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={filters.minRating}
              onChange={(e) => setRatingRange(Number(e.target.value), filters.maxRating)}
            />
            <RangeLabel>〜</RangeLabel>
            <RangeInput
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={filters.maxRating}
              onChange={(e) => setRatingRange(filters.minRating, Number(e.target.value))}
            />
            <RangeLabel>★</RangeLabel>
          </RangeGroup>
        </FormGroup>

        <FormGroup>
          <Label>月額給与（万円）</Label>
          <RangeGroup>
            <RangeInput
              type="number"
              min="0"
              max="100"
              value={filters.minSalary}
              onChange={(e) => setSalaryRange(Number(e.target.value), filters.maxSalary)}
            />
            <RangeLabel>〜</RangeLabel>
            <RangeInput
              type="number"
              min="0"
              max="100"
              value={filters.maxSalary}
              onChange={(e) => setSalaryRange(filters.minSalary, Number(e.target.value))}
            />
            <RangeLabel>万円</RangeLabel>
          </RangeGroup>
        </FormGroup>

        <FormGroup style={{ flex: 2 }}>
          <Label>技術・タグ</Label>
          <TagsContainer>
            <TagsInput
              $isOpen={showTagsDropdown}
              onClick={() => setShowTagsDropdown(!showTagsDropdown)}
            >
              {filters.tags.length > 0 ? (
                filters.tags.map(tag => (
                  <SelectedTag
                    key={tag}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(tag);
                    }}
                  >
                    {tag} ×
                  </SelectedTag>
                ))
              ) : (
                <TagsPlaceholder>技術やタグを選択...</TagsPlaceholder>
              )}
            </TagsInput>
            <ChevronIcon $isOpen={showTagsDropdown} />
            {showTagsDropdown && (
              <TagsDropdown
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {availableTags.map(tag => (
                  <TagOption
                    key={tag}
                    $selected={filters.tags.includes(tag)}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </TagOption>
                ))}
              </TagsDropdown>
            )}
          </TagsContainer>
        </FormGroup>
      </FormRow>

      <FormRow>
        <SortGroup>
          <Label>並び替え:</Label>
          <Select
            value={filters.sortBy}
            onChange={(e) => setSorting(e.target.value as any, filters.sortOrder)}
            style={{ minWidth: '120px' }}
          >
            <option value="rating">評価</option>
            <option value="deadline">締切</option>
            <option value="salary">給与</option>
            <option value="name">名前</option>
          </Select>
          <Select
            value={filters.sortOrder}
            onChange={(e) => setSorting(filters.sortBy, e.target.value as any)}
            style={{ minWidth: '100px' }}
          >
            <option value="desc">降順</option>
            <option value="asc">昇順</option>
          </Select>
        </SortGroup>

        <FilterActions>
          <IconButton
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetFilters}
          >
            <RotateCcw size={16} />
            リセット
          </IconButton>
        </FilterActions>
      </FormRow>
    </FormContainer>
  );
};

export default SearchForm;