import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Search, X, Filter } from 'lucide-react';
import { useInternshipStore } from '../../store/internship-store';

const SearchContainer = styled.div`
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const SearchHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const SearchTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin: 0;
`;

const ClearButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  background-color: #ffffff;
  color: #6b7280;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: #f9fafb;
    border-color: #d1d5db;
  }
`;

const SearchRow = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SearchInputContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 300px;

  @media (max-width: 768px) {
    min-width: unset;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 16px 12px 44px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 16px;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
`;

const FilterRow = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FilterLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #374151;
`;

const FilterInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 10px 12px;
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

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
`;

const TagInput = styled.input`
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  font-size: 14px;
  color: #111827;
  background-color: #ffffff;
  transition: all 0.2s ease;
  margin-bottom: 8px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  background-color: #3b82f6;
  color: #ffffff;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
`;

const TagRemove = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  margin: 0;
  border: none;
  background: none;
  color: #ffffff;
  cursor: pointer;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

const RangeGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const RangeInput = styled(FilterInput)`
  max-width: 120px;
`;

const RangeSeparator = styled.span`
  color: #6b7280;
  font-size: 14px;
`;

export const SearchForm: React.FC = () => {
  const {
    searchFilters,
    setSearchQuery,
    setCompanyFilter,
    setTagsFilter,
    setRatingFilter,
    setLocationFilter,
    setSalaryFilter,
    clearFilters
  } = useInternshipStore();

  const [tagInput, setTagInput] = useState('');

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, [setSearchQuery]);

  const handleCompanyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyFilter(e.target.value);
  }, [setCompanyFilter]);

  const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocationFilter(e.target.value);
  }, [setLocationFilter]);

  const handleMinRatingChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const minRating = parseFloat(e.target.value);
    setRatingFilter(minRating, searchFilters.maxRating);
  }, [setRatingFilter, searchFilters.maxRating]);

  const handleMaxRatingChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const maxRating = parseFloat(e.target.value);
    setRatingFilter(searchFilters.minRating, maxRating);
  }, [setRatingFilter, searchFilters.minRating]);

  const handleMinSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const minSalary = parseInt(e.target.value) || 0;
    setSalaryFilter(minSalary, searchFilters.salaryRange[1]);
  }, [setSalaryFilter, searchFilters.salaryRange]);

  const handleMaxSalaryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const maxSalary = parseInt(e.target.value) || 1000000;
    setSalaryFilter(searchFilters.salaryRange[0], maxSalary);
  }, [setSalaryFilter, searchFilters.salaryRange]);

  const handleTagInputKeyPress = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (!searchFilters.tags.includes(newTag)) {
        setTagsFilter([...searchFilters.tags, newTag]);
      }
      setTagInput('');
    }
  }, [tagInput, searchFilters.tags, setTagsFilter]);

  const handleTagRemove = useCallback((tagToRemove: string) => {
    setTagsFilter(searchFilters.tags.filter(tag => tag !== tagToRemove));
  }, [searchFilters.tags, setTagsFilter]);

  const minRatingOptions = [0, 1, 2, 3, 4, 5].map(rating => (
    <option key={rating} value={rating}>
      {rating === 0 ? '指定なし' : `${rating}以上`}
    </option>
  ));

  const maxRatingOptions = [5, 4, 3, 2, 1, 0].map(rating => (
    <option key={rating} value={rating}>
      {rating === 0 ? '指定なし' : `${rating}以下`}
    </option>
  ));

  return (
    <SearchContainer>
      <SearchHeader>
        <SearchTitle>検索・フィルター</SearchTitle>
        <ClearButton onClick={clearFilters}>
          <X size={16} />
          クリア
        </ClearButton>
      </SearchHeader>

      <SearchRow>
        <SearchInputContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="インターンシップ名、企業名、説明で検索..."
            value={searchFilters.query}
            onChange={handleSearchChange}
          />
        </SearchInputContainer>
      </SearchRow>

      <FilterRow>
        <FilterGroup>
          <FilterLabel>企業名</FilterLabel>
          <FilterInput
            type="text"
            placeholder="企業名で絞り込み"
            value={searchFilters.companyName}
            onChange={handleCompanyChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>勤務地</FilterLabel>
          <FilterInput
            type="text"
            placeholder="勤務地で絞り込み"
            value={searchFilters.location}
            onChange={handleLocationChange}
          />
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>最低評価</FilterLabel>
          <FilterSelect
            value={searchFilters.minRating}
            onChange={handleMinRatingChange}
          >
            {minRatingOptions}
          </FilterSelect>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>最高評価</FilterLabel>
          <FilterSelect
            value={searchFilters.maxRating}
            onChange={handleMaxRatingChange}
          >
            {maxRatingOptions}
          </FilterSelect>
        </FilterGroup>
      </FilterRow>

      <FilterRow>
        <FilterGroup>
          <FilterLabel>給与範囲（月額）</FilterLabel>
          <RangeGroup>
            <RangeInput
              type="number"
              placeholder="最低額"
              value={searchFilters.salaryRange[0]}
              onChange={handleMinSalaryChange}
              min="0"
              step="10000"
            />
            <RangeSeparator>〜</RangeSeparator>
            <RangeInput
              type="number"
              placeholder="最高額"
              value={searchFilters.salaryRange[1]}
              onChange={handleMaxSalaryChange}
              min="0"
              step="10000"
            />
          </RangeGroup>
        </FilterGroup>

        <FilterGroup>
          <FilterLabel>タグ</FilterLabel>
          <TagInput
            type="text"
            placeholder="タグを入力してEnterキー"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={handleTagInputKeyPress}
          />
          <TagsContainer>
            {searchFilters.tags.map((tag) => (
              <Tag key={tag}>
                {tag}
                <TagRemove onClick={() => handleTagRemove(tag)}>
                  <X size={12} />
                </TagRemove>
              </Tag>
            ))}
          </TagsContainer>
        </FilterGroup>
      </FilterRow>
    </SearchContainer>
  );
};