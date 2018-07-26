package no.hlf.godlyd.api.model;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.text.SimpleDateFormat;

@Entity
@Table(name = "lydforholdvurdering")
@PrimaryKeyJoinColumn(name = "id")
public class LydforholdVurdering extends Vurdering {




}
