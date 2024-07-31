// Service Worker 설치 이벤트
self.addEventListener('install', function(event) {
  console.log('Service Worker installing.');
  // 설치 중 특별한 작업이 필요하다면 이곳에서 수행
});

// Service Worker 활성화 이벤트
self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.');
  // 이전 버전의 캐시 삭제 등 필요한 작업 수행 가능
});

// 푸시 이벤트 수신
self.addEventListener('push', function(event) {
  console.log('Push event received:', event);

  // 푸시 메시지 데이터 추출
  const data = event.data ? event.data.text() : 'No payload';

  // 푸시 알림 옵션 설정
  const options = {
    body: data,
    icon: 'notification-icon.png', // 알림에 사용할 아이콘 URL
    badge: 'badge-icon.png'        // 사용할 배지 아이콘 URL (선택 사항)
  };

  // 푸시 알림 표시
  event.waitUntil(
    self.registration.showNotification('New Message', options)
  );
});

// 알림 클릭 이벤트
self.addEventListener('notificationclick', function(event) {
  console.log('Notification click event:', event);
  event.notification.close(); // 알림 닫기

  // 클라이언트 창을 열거나 포커스를 맞춤
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      // 이미 열려 있는 클라이언트가 있으면 그 창을 포커스
      for (var i = 0; i < clientList.length; i++) {
        var client = clientList[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // 없다면 새 창을 엶
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
