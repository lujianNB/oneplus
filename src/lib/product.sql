-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 2019-11-16 09:35:10
-- 服务器版本： 5.7.14
-- PHP Version: 5.6.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oneplus`
--

-- --------------------------------------------------------

--
-- 表的结构 `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL COMMENT '商品id',
  `name` varchar(255) NOT NULL COMMENT '商品名称',
  `discount` decimal(3,1) NOT NULL COMMENT '商品折扣',
  `price` decimal(20,2) NOT NULL COMMENT '商品单价',
  `num` int(10) NOT NULL COMMENT '库存数量',
  `pic` text NOT NULL COMMENT '商品图片',
  `details` text NOT NULL COMMENT '商品详情'
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `product`
--

INSERT INTO `product` (`id`, `name`, `discount`, `price`, `num`, `pic`, `details`) VALUES
(1, 'OnePlus 5T 全包保护壳', '5.0', '199.00', 1000, '[{"src": "/images/store/p-1.png" }, {"src": "/images/details/p1-1.png" }, {"src": "/images/details/p1-2.png" },{"src": "/images/details/p1-3.png" },{"src": "/images/details/p1-4.png" }]', ''),
(2, 'OnePlus 5T 个性保护壳', '5.0', '99.00', 1000, '[{"src": "/images/store/p-2.png" }, {"src": "/images/details/p2-1.png" }, {"src": "/images/details/p2-2.png" },{"src": "/images/details/p2-3.png" },{"src": "/images/details/p2-4.png" }]', ''),
(3, 'OnePlus 6T 个性保护壳', '6.0', '99.00', 1000, '[{"src": "/images/store/p-3.png" }, {"src": "/images/details/p3-1.png" }, {"src": "/images/details/p3-2.png" },{"src": "/images/details/p3-3.png" },{"src": "/images/details/p3-4.png" }]', ''),
(4, 'OnePlus 6T 全包保护壳', '6.0', '149.00', 1000, '[{"src": "/images/store/p-4.png" }, {"src": "/images/details/p4-1.png" }, {"src": "/images/details/p4-2.png" },{"src": "/images/details/p4-3.png" },{"src": "/images/details/p4-4.png" }]', ''),
(5, 'OnePlus 7 个性保护壳', '10.0', '99.00', 1000, '[{"src": "/images/store/p-5.png" }, {"src": "/images/details/p5-1.png" }, {"src": "/images/details/p5-2.png" },{"src": "/images/details/p5-3.png" },{"src": "/images/details/p5-4.png" }]', ''),
(6, 'OnePlus 6T 硅胶保护壳', '6.1', '129.00', 1000, '[{"src": "/images/store/p-6.png" }, {"src": "/images/details/p6-1.png" }, {"src": "/images/details/p6-2.png" },{"src": "/images/details/p6-3.png" },{"src": "/images/details/p6-4.png" }]', ''),
(7, 'OnePlus 7 全包保护壳', '10.0', '149.00', 1000, '[{"src": "/images/store/p-7.png" }, {"src": "/images/details/p7-1.png" }, {"src": "/images/details/p7-2.png" },{"src": "/images/details/p7-3.png" },{"src": "/images/details/p7-4.png" }]', ''),
(8, 'OnePlus 7 硅胶保护壳', '10.0', '129.00', 1000, '[{"src": "/images/store/p-8.png" }, {"src": "/images/details/p8-1.png" }, {"src": "/images/details/p8-2.png" },{"src": "/images/details/p8-3.png" },{"src": "/images/details/p8-4.png" }]', ''),
(9, 'OnePlus 7 加油套装', '8.5', '406.00', 1000, '[{"src": "/images/store/p-9.png" }]', ''),
(10, 'OnePlus 7  简约套装', '8.5', '228.00', 1000, '[{"src": "/images/store/p-10.png" }]', ''),
(11, 'OnePlus 旅行套装', '9.5', '458.00', 1000, '[{"src": "/images/store/p-11.png" }]', ''),
(12, 'OnePlus Warp 30 闪充套装', '9.6', '228.00', 1000, '[{"src": "/images/store/p-12.png" }]', ''),
(13, 'OnePlus 7', '9.7', '2999.00', 1000, '[{"src": "/images/store/p-13.png" }]', ''),
(14, 'OnePlus 7 Pro', '9.8', '3999.00', 1000, '[{"src": "/images/store/p-14.png" }]', ''),
(15, '一加云耳 2', '10.0', '599.00', 1000, '[{"src": "/images/store/p-15.png" }]', ''),
(16, 'OnePlus 6T 保护套', '6.1', '129.00', 1000, '[{"src": "/images/store/p-16.png" }]', ''),
(17, '闪充套装', '8.1', '178.00', 1000, '[{"src": "/images/store/p-17.png" }]', ''),
(18, 'OnePlus 7 Pro 全包保护壳', '10.0', '149.00', 1000, '[{"src": "/images/store/p-18.png" }]', ''),
(19, 'OnePlus 7 3D 钢化膜', '10.0', '129.00', 1000, '[{"src": "/images/store/p-19.png" }]', ''),
(20, 'OnePlus 7 个性保护壳', '10.0', '99.00', 1000, '[{"src": "/images/store/p-20.png" }]', ''),
(21, 'OnePlus 7 Pro 个性保护壳', '10.0', '99.00', 1000, '[{"src": "/images/store/p-21.png" }]', ''),
(22, '一加Warp闪充30电源适配器', '10.0', '149.00', 1000, '[{"src": "/images/store/p-22.png" }]', ''),
(23, '一加Warp闪充30车载充电器', '10.0', '199.00', 1000, '[{"src": "/images/store/p-23.png" }]', ''),
(24, '一加 Warp 闪充 30 Type-C 数据线', '10.0', '79.00', 1000, '[{"src": "/images/store/p-24.png" }]', ''),
(25, '一加Type-C OTG数据线', '10.0', '59.00', 1000, '[{"src": "/images/store/p-25.png" }]', ''),
(26, '一加闪充电源适配器', '10.0', '99.00', 1000, '[{"src": "/images/store/p-26.png" }]', ''),
(27, 'OnePlus Type-C转3.5mm转接线', '10.0', '39.00', 1000, '[{"src": "/images/store/p-27.png" }]', ''),
(28, '一加 Explorer 双肩包', '10.0', '499.00', 1000, '[{"src": "/images/store/p-28.png" }]', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '商品id', AUTO_INCREMENT=29;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
