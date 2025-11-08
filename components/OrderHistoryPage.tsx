import React from 'react';
import { Order, OrderStatus } from '../types';
import Breadcrumbs from './Breadcrumbs';

interface OrderHistoryPageProps {
  onBack: () => void;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
}

const getStatusClass = (status: Order['status']) => {
    switch (status) {
      case 'Hoàn thành':
        return 'bg-green-500/20 text-green-400';
      case 'Đang xử lý':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'Đang giao hàng':
        return 'bg-blue-500/20 text-blue-400';
      case 'Đã Hủy':
        return 'bg-red-500/20 text-red-400';
      case 'Trả hàng':
        return 'bg-orange-500/20 text-orange-400';
      case 'Chờ xác nhận':
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
};

const OrderStatusTracker: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const stages: OrderStatus[] = ["Chờ xác nhận", "Đang xử lý", "Đang giao hàng", "Hoàn thành"];
    
    // Return null for final states as they are handled outside the tracker now
    if (status === 'Đã Hủy' || status === 'Trả hàng') {
        return null;
    }
    
    const currentStageIndex = stages.indexOf(status);

    return (
        <div className="px-4 py-6 border-t border-gray-700">
            <div className="flex items-start">
                {stages.map((stage, index) => {
                    const isCompleted = index <= currentStageIndex;
                    const isLastStage = index === stages.length - 1;
                    
                    return (
                        <React.Fragment key={stage}>
                            <div className="flex flex-col items-center w-1/4">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isCompleted ? 'border-gym-yellow bg-gym-yellow' : 'border-gray-600'}`}>
                                    {isCompleted ? (
                                        <svg className="w-5 h-5 text-gym-darker" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                                    ) : (
                                        <div className="w-3 h-3 bg-gray-600 rounded-full"></div>
                                    )}
                                </div>
                                <p className={`mt-2 text-xs text-center font-medium transition-colors duration-300 ${isCompleted ? 'text-white' : 'text-gym-gray'}`}>{stage}</p>
                            </div>
                            {!isLastStage && (
                                <div className={`flex-1 mt-4 h-1 rounded-full transition-colors duration-300 ${isCompleted ? 'bg-gym-yellow' : 'bg-gray-600'}`}></div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

const OrderHistoryPage: React.FC<OrderHistoryPageProps> = ({ onBack, orders, onCancelOrder }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <Breadcrumbs items={[{ label: 'Trang chủ', onClick: onBack }, { label: 'Lịch sử đơn hàng' }]} />
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white tracking-wider text-center mb-10 uppercase">Lịch sử đơn hàng</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => {
              const canBeCancelled = order.status === 'Chờ xác nhận' || order.status === 'Đang xử lý';
              const isFinalState = order.status === 'Đã Hủy' || order.status === 'Trả hàng';

              return (
                <div key={order.id} className="bg-gym-dark rounded-lg shadow-lg overflow-hidden">
                  <header className="bg-gym-darker p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-700">
                    <div>
                      <h2 className="font-bold text-white">Mã đơn hàng: <span className="text-gym-yellow">{order.id}</span></h2>
                      <p className="text-sm text-gym-gray">Ngày đặt: {order.date}</p>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="font-bold text-white text-lg">{order.total.toLocaleString('vi-VN')}₫</p>
                    </div>
                  </header>
                  <div className="p-4 space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center space-x-4">
                        <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                        <div className="flex-grow">
                          <p className="font-semibold text-white text-sm">{item.name}</p>
                          <p className="text-xs text-gym-gray">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="text-sm text-white font-medium">{(item.price * item.quantity).toLocaleString('vi-VN')}₫</p>
                      </div>
                    ))}
                  </div>

                  {isFinalState ? (
                     <div className="p-4 border-t border-gray-700">
                        <p className={`text-center font-semibold ${order.status === 'Đã Hủy' ? 'text-red-500' : 'text-orange-400'}`}>
                           {order.status === 'Đã Hủy' ? 'Đơn hàng đã được hủy.' : 'Đơn hàng đã được trả lại.'}
                        </p>
                     </div>
                  ) : (
                    <OrderStatusTracker status={order.status} />
                  )}

                  {canBeCancelled && (
                    <footer className="bg-gym-darker p-3 flex justify-end items-center">
                        <button 
                            onClick={() => onCancelOrder(order.id)}
                            className="text-sm font-semibold text-red-500 hover:text-red-400 border border-red-500 rounded-md px-4 py-1.5 transition-colors hover:bg-red-500/10"
                        >
                            Hủy đơn hàng
                        </button>
                    </footer>
                  )}
                </div>
              )
            })}
          </div>
        ) : (
          <div className="text-center bg-gym-dark p-10 rounded-lg">
            <p className="text-gym-gray text-lg">Bạn chưa có đơn hàng nào.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;