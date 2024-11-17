export interface Category {
    categoryId: number | null; // 전체 카테고리를 null로 설정함
    categoryName: string;
    isActive?: boolean;
}
