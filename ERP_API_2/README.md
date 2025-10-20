
#### 3
Config lại SQL Server để connect
> 1. Mở SQL Server Configuration Manager trên máy
> 2. Ở tab SQL Server Services  --> `SQL Server (SQLEXPRESS)` và `SQL Server Browser` có state là `running`, nếu đang stop thì cần bật lên

<img width="1343" height="515" alt="image" src="https://github.com/user-attachments/assets/9f1627a3-076b-4272-aec8-fa753e8544d8" />


> 3. Ở tab SQL Server Network Configuration -> Protocols for SQLEXPRESS -> TCP/IP cần `enable`

<img width="926" height="475" alt="image" src="https://github.com/user-attachments/assets/9d61fd02-61dc-4cc1-b7a1-7754c1f93c68" />


> Double click TCP/IP -> IP Address -> IPAll (ở dưới cùng) -> set `TCP Port = 1433`, `TCP Dynamic Ports` xóa để trống 

<img width="1283" height="884" alt="image" src="https://github.com/user-attachments/assets/7f7ab954-c0a1-4218-9798-a8583327deb8" />


Trên SSMS
> Right click `server name` -> properties -> Security -> Phần Server Authentication chọn SQL Server and Windows Authentication mode

<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/45b5f127-e0be-4757-a1c2-429f04763178" />
<img width="1770" height="899" alt="image" src="https://github.com/user-attachments/assets/758f92ba-b3c4-4f8d-a5f4-1bd706cb4d3a" />
