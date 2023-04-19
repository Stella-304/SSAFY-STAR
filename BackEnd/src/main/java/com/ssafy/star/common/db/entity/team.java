package com.ssafy.star.common.db.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class team {

    @Id @GeneratedValue
    Long id;

    @Column
    boolean isAuthed;
}
