package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "informasjonvurdering")
@PrimaryKeyJoinColumn(name = "id")
public class InformasjonVurdering extends Vurdering {




}
