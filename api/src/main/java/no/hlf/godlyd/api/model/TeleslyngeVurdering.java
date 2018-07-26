package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;


@Entity
@Table(name = "teleslyngevurdering")
@PrimaryKeyJoinColumn(name = "id")
public class TeleslyngeVurdering extends Vurdering {



}
