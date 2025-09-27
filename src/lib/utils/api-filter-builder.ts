export interface Filter {
  operator: 'IN' | 'EQ' | 'GT' | 'LT' | 'GTE' | 'LTE' | 'NEQ';
  values: any[];
  key: string;
}

export class ApiFilterBuilder {
  fitlers: Filter[] = [];

  static fromFilters(filters: Filter[]) {
    const builder = new ApiFilterBuilder();

    builder.fitlers = filters;
    return builder;
  }

  addFilter(filter: Filter) {
    this.fitlers.push(filter);
  }

  build() {
    return JSON.stringify(this.fitlers);
  }
}
