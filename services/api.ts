import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiResponse, ApiError } from '@/types/api';
import { Product, ProductCategory } from '@/types/product';

// Mock data fallback
import { mockProducts, mockCategories } from './mockData';

class ApiService {
  private client: AxiosInstance;
  private useMockData: boolean;

  constructor() {
    this.client = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true' || false;
    
    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.client.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        console.error('API Error:', error.response?.data || error.message);
        
        // Auto-logout on 401
        if (error.response?.status === 401) {
          this.clearToken();
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
        
        throw this.normalizeError(error);
      }
    );
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
    }
  }

  private clearToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
    }
  }

  private normalizeError(error: AxiosError): ApiError {
    if (error.response?.data) {
      const data = error.response.data as any;
      return {
        message: data.message || data.detail || 'An error occurred',
        code: data.code || 'UNKNOWN_ERROR',
        details: data.details,
      };
    }
    
    return {
      message: error.message || 'Network error occurred',
      code: 'NETWORK_ERROR',
    };
  }

  private async withFallback<T>(
    apiCall: () => Promise<AxiosResponse<ApiResponse<T>>>,
    mockData: T
  ): Promise<ApiResponse<T>> {
    if (this.useMockData) {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
      return {
        data: mockData,
        success: true,
        message: 'Using mock data',
      };
    }

    try {
      const response = await apiCall();
      return response.data;
    } catch (error) {
      console.warn('API call failed, using mock data:', error);
      return {
        data: mockData,
        success: false,
        message: 'Using fallback data due to API failure',
      };
    }
  }

  // Products API
  async getProducts(params?: {
    category?: string;
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<ApiResponse<Product[]>> {
    return this.withFallback(
      () => this.client.get('/products', { params }),
      mockProducts
    );
  }

  async getProductBySlug(slug: string): Promise<ApiResponse<Product>> {
    const product = mockProducts.find(p => p.slug === slug) || mockProducts[0];
    return this.withFallback(
      () => this.client.get(`/products/${slug}`),
      product
    );
  }

  async getCategories(): Promise<ApiResponse<ProductCategory[]>> {
    return this.withFallback(
      () => this.client.get('/categories'),
      mockCategories
    );
  }

  // Auth API
  async login(credentials: { email: string; password: string }) {
    const response = await this.client.post('/auth/login', credentials);
    if (response.data.success && response.data.data?.token) {
      this.setToken(response.data.data.token);
    }
    return response.data;
  }

  async register(userData: { name: string; email: string; password: string }) {
    const response = await this.client.post('/auth/register', userData);
    return response.data;
  }
}

export const apiService = new ApiService();
export default apiService;