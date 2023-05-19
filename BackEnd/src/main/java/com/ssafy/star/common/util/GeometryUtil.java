package com.ssafy.star.common.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.star.common.db.dto.response.CardDetailDto;
import com.ssafy.star.common.db.dto.response.EdgeDto;
import com.ssafy.star.constellation.Point3D;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class GeometryUtil {
	static class Edge implements Comparable<Edge> {
		int a;
		int b;
		double distance;

		public Edge(int a, int b, double distance) {
			this.a = a;
			this.b = b;
			this.distance = distance;
		}

		@Override
		public int compareTo(Edge o) {
			return Double.compare(this.distance, o.distance);
		}
	}

	private final static int maxStar = 15;

	public static int getLevelFromCardCnt(int cardCnt) {
		if (cardCnt <= 4)
			return 4;
		if (cardCnt <= 10)
			return 4;
		if (cardCnt <= 40)
			return 4;
		if (cardCnt <= 200)
			return 4;
		if (cardCnt <= 600)
			return 5;
		return 6;
	}

	public static int getVerticesFromLevel(int level) {
		if (level == 1)
			return 4;
		if (level == 2)
			return 17;
		if (level == 3)
			return 73;
		if (level == 4)
			return 305;
		if (level == 5)
			return 1249;
		return 5057;
	}

	private static long[] parents = new long[5057];

	public static List<EdgeDto> getEdgeList(List<CardDetailDto> cards) {
		int N = cards.size();
		for (int i = 0; i < N; i++) {
			parents[i] = i;
		}

		List<EdgeDto> edgeDtoList = new ArrayList<>();
		List<Edge> edges = new ArrayList<>();
		List<List<Integer>> adjList = new ArrayList<>();

		for (int i = 0; i < N; i++) {
			adjList.add(new ArrayList<>());
		}

		for (int i = 0; i < N - 1; i++) {
			double x1 = cards.get(i).getX() ;
			double y1 = cards.get(i).getY() ;
			double z1 = cards.get(i).getZ() ;

			for (int j = i + 1; j < N; j++) {
				double x2 = cards.get(j).getX() ;
				double y2 = cards.get(j).getY() ;
				double z2 = cards.get(j).getZ() ;
				double distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
				edges.add(new Edge(i, j, distance));
			}
		}

		Collections.sort(edges);

		for (Edge edge : edges) {
			if (!isSameParents(edge.a, edge.b)) {
				union(edge.a, edge.b);
				edgeDtoList.add(new EdgeDto(cards.get(edge.a), cards.get(edge.b)));
			}
		}

		// int removeEdge = N / maxStar;
		// Random random = new Random();
		// while (removeEdge > 0) {
		// 	removeEdge--;
		// 	edgeDtoList.remove(random.nextInt(edgeDtoList.size()));
		// }

		// y좌표의 합 내림차순으로 간선의 쌍 정렬
		// 가운데에서부터 퍼져나가는 느낌.
		// edgeDtoList.sort(new Comparator<EdgeDto>() {
		//     @Override
		//     public int compare(EdgeDto o1, EdgeDto o2) {
		//
		//         return Double.compare(-(o1.getY1() + o1.getY1()), -(o2.getY1() + o2.getY2()));
		//     }
		// });
		return edgeDtoList;
	}

	public static List<EdgeDto> getEdgeList2(List<CardDetailDto> cards) {
		int N = cards.size();
		for (int i = 0; i < N; i++) {
			parents[i] = i;
		}

		List<EdgeDto> edgeDtoList = new ArrayList<>();
		List<Edge> edges = new ArrayList<>();
		List<List<Integer>> adjList = new ArrayList<>();

		for (int i = 0; i < N; i++) {
			adjList.add(new ArrayList<>());
		}

		for (int i = 0; i < N - 1; i++) {
			double x1 = cards.get(i).getX() ;
			double y1 = cards.get(i).getY() ;
			double z1 = cards.get(i).getZ() ;

			for (int j = i + 1; j < N; j++) {
				double x2 = cards.get(j).getX() ;
				double y2 = cards.get(j).getY() ;
				double z2 = cards.get(j).getZ() ;
				double distance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2));
				edges.add(new Edge(i, j, distance));
			}
		}

		Collections.sort(edges);

		for (Edge edge : edges) {
			if (!isSameParents(edge.a, edge.b)) {
				union(edge.a, edge.b);
				edgeDtoList.add(new EdgeDto(cards.get(edge.a), cards.get(edge.b)));
			}
		}

		 int removeEdge = N / maxStar;
		 Random random = new Random();
		 while (removeEdge > 0) {
		 	removeEdge--;
		 	edgeDtoList.remove(random.nextInt(edgeDtoList.size()));
		 }

		return edgeDtoList;
	}

	private static boolean isSameParents(long a, long b) {
		return find(a) == find(b);
	}

	private static void union(long a, long b) {

		a = find(a);
		b = find(b);
		if (a < b)
			parents[(int)b] = a;
		else
			parents[(int)a] = b;
	}

	private static long find(long a) {//a의 대표자 찾기
		if (parents[(int)a] == a)
			return a;
		return parents[(int)a] = find(parents[(int)a]); //우리의 대표자를 나의 부모로 만듬 plus Path Compression까지 해줘.
	}
}
